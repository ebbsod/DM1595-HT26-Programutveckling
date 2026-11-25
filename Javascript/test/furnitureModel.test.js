const assert = chai.assert;
const expect = chai.expect;

describe("FurnitureModel", function testFurnitureModelCB() {
  function removeComments(m) { return m.toString().replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ""); }
  const assignment = /[_$a-zA-Z\xA0-\uFFFF][_\.$a-zA-Z0-9\xA0-\uFFFF]*\s*=[^=><]/g;
  const plusEqual = /[_$a-zA-Z\xA0-\uFFFF][_\.$a-zA-Z0-9\xA0-\uFFFF]*\s*[\+\-\*\/\%]=/g;
  const CBWarning = "Do not use anonymous or arrow functions. Use a function name that describes what the function does. If the function is passed as callback, please use a CB suffix";

  function noIkeaSource(m) {
    expect(/IkeaSource/g.test(removeComments(m)),
      m.name + " does not need to use IkeaSource, it only operates with the FurnitureModel items").to.equal(false);
  }

  function noArraySpread(text, name) {
    expect(/\[\s*\.\.\./g.test(text),
      name + " does not need to use array spread. Arrays don't need to be cloned if you use filter(), map() or reduce() because they do not modify the original arrray, but create a new one. That is, they are is immutable methods. sort(), push(), splice() are mutable.").to.equal(false);
  }

  function noAssignment(m, one = false) {
    it(m.name + " functional: " + (one ? "a single assignment, to this.items" : "no assignments "), function noAssignmentTestCB() {
      const text = removeComments(m);

      const matches = [...text.matchAll(assignment)];
      if (one) {
        expect(matches.length, "may only assign this.items, once. It uses assignments: " + matches).to.equal(1);
        expect(matches[0][0], "may only assign this.items, once").to.be.a('string');
        expect(/^this.items\s*=/g.test(matches[0][0]), "may only assign this.items, once").to.equal(true);
      } else {
        expect(matches.length, "may not use assignments. It uses " + matches).to.equal(0);
      }
      const matches1 = [...text.matchAll(plusEqual)];
      expect(matches1.length, "may not use +=, -=, /=, %= assignments. It uses " + matches1).to.equal(0);

      expect(/Object\s*\.\s*assign\s*\(/g.test(text), "functional code may not use Object.assign, as it performs a mutation (assignment)").to.equal(false);
    }
    );

  }

  function testFunctional(method, noASpread) {
    it(method.name + " functional: no procedural statements or mutable methods", function testFunctionalTestCB() {
      const text = removeComments(method);

      expect(/(var\s+|let\s+|for\s*\(|while\s*\(|if\s*\(|push\s*\(|splice\s*\(|unshift\s*\(|pop\s*\(|shift\s*\()/g
        .test(text),
        `
            Implementation should be functional and therefore not include statements like:
            'let', 'var', 'for', 'while', 'if'
            or mutable array methods like:
            'push', 'pop', 'unshift', 'shift', 'splice'

            `).to.equal(false);

      expect(/=>/g.test(text), CBWarning).to.equal(false);
      expect(/function\s*\(/g.test(text), CBWarning).to.equal(false);

      if (noASpread)
        noArraySpread(text, method.name);

    });
  }

  this.timeout(200000);  // increase to allow debugging during the test run
  let model = FurnitureModel;

  beforeEach(function beforeEachTestCB() {
    model.copies = 2;
    model.items = [];
  });

  describe("W1 number of copies (functions, if(), throw exercise)", function constructorSuiteCB() {
    /*        it("number of copies and items are the ones indicated as constructor parameters", function constructortCB() {
                model= new FurnitureModel(3, [furnitureConst[0], furnitureConst[3]]);
                expect(model.copies).to.equal(3, "number of copies should be the one indicated as constructor parameter");
                const sameItems= "items array should contain the same elements as the one indicated as constructor parameter";
                expect(model.items.length).to.equal(2, sameItems);
                expect(model.items[0]).to.equal(furnitureConst[0], sameItems);
                expect(model.items[1]).to.equal(furnitureConst[3], sameItems);
            });*/
    it("default number of copies is 2", function numberOfCopiesDefaultNumberCB() {
      expect(model.copies, "a FurnitureModel number of copies should be set to 2").to.equal(2); /* when no parameter is sent to the constructor*/
    });

    it("can set and get number of copies", function getSetNumberOfCopiesCB() {
      model.setNumberOfCopies(1);
      expect(model.copies, "number of copies should have the value passed to setNumberOfCopies").to.equal(1, "after setting number of copies, the model copies should be the indicated value");

      model.setNumberOfCopies(3);
      expect(model.copies, "number of copies should have the value passed to setNumberOfCopies").to.equal(3, "after setting number of copies, the model copies should be the indicated value");
    });

    it("number of copies is a positive integer", function numberOfCopiesPositiveIntegerTestCB() {
      const msg = "number of copies not a positive integer";

      expect(function testThrowNegativeCB() { model.setNumberOfCopies(-1); }, "when a negative number is passed, setNumberOfCopies should throw").to.throw(msg);
      expect(function testThrowZeroCB() { model.setNumberOfCopies(0); }, "when zero is passed, setNumberOfCopies should throw").to.throw(msg);
      expect(function testThrowRealCB() { model.setNumberOfCopies(3.14159265); }, "when a non-integer is passed, setNumberOfCopies should throw").to.throw(msg);
    });
  });

  const itemPresent = "an item that was added to the cart must be present in the model items array";
  describe("W1 cart (array exercises)", function cartSuiteCB() {
    it("default (initial) items is an empty array", function defaultItemsCB() {
      expect(model.items, "a FurnitureModel items should be set to empty array by the constructor").to.be.an("Array");
      expect(model.items.length, "a FurnitureModel items should be set to empty array").to.equal(0);   /* when no second parameter is sent to the constructor*/
    });


    it("can add items (adding elements to arrays)", function canAddItemsTestCB() {
      noIkeaSource(model.addToCart);
      model.addToCart(furnitureConst[0]);
      expect(model.items).to.include(furnitureConst[0], itemPresent);
      expect(model.items.length).to.equal(1, "after one item was added, the model items array must have length 1");

      model.addToCart(furnitureConst[3]);
      expect(model.items).to.include(furnitureConst[0], itemPresent);
      expect(model.items).to.include(furnitureConst[3], itemPresent);
      expect(model.items.length).to.equal(2, "after two items were added, the model items array must have length 2");
    });

    it("can remove items (filter() exercise)", function removeItemTestCB() {
      noIkeaSource(model.removeFromCart);
      model.items = [furnitureConst[0], furnitureConst[3], furnitureConst[5]];

      model.removeFromCart({ id: 1 });
      // should now be removed
      expect(model.items).to.not.include(furnitureConst[0], "after an item with a given ID was removed, no items with that ID should be found in the items array");

      const itemStill = "after an item removal, the items that does not have that ID must be still in the cart";
      expect(model.items.length).to.equal(2, "after an item removal from the cart, the items array should decrease in length with 1 if an item with that ID  was indeed part of the cart");
      expect(model.items).to.include(furnitureConst[3], itemStill);
      expect(model.items).to.include(furnitureConst[5], itemStill);

      // remove non-existing items
      model.removeFromCart({ id: 256 });
      expect(model.items.length).to.equal(2, "after attempting to remove an item whose ID is not present in the cart, the items length should stay unchanged");
      expect(model.items).to.include(furnitureConst[3], itemStill);
      expect(model.items).to.include(furnitureConst[5], itemStill);
    });

    it("items of type (filter() and undefined exercise)", function furnitureOfTypeTestCB() {
      noIkeaSource(model.getItemOfType);
      const furnitureType = "getItemOfType should return the item from the cart with the indicated type";
      model.items = [furnitureConst[1], furnitureConst[3], furnitureConst[5]];
      expect(model.getItemOfType("seating")).to.equal(furnitureConst[1], furnitureType);
      expect(model.getItemOfType("table")).to.equal(furnitureConst[3], furnitureType);
      expect(model.getItemOfType("storage")).to.equal(furnitureConst[5], furnitureType);

      model.items = [furnitureConst[1], furnitureConst[3]];
      expect(model.getItemOfType("storage")).to.equal(undefined, "if no items of the given type exists in the cart, getItemOfType must return undefined");
    });

    it("overwrites items of the same type when adding (combine filter() with adding elements to arrays)", function furnitureOfSameTypeTestCB() {
      model.items = [furnitureConst[5], furnitureConst[0], furnitureConst[3]];
      model.addToCart(furnitureConst[1]);
      // the old seating should no longer exist
      expect(model.items).to.not.include(furnitureConst[0], "if an item with the same type is added, the existing items with that type must be removed from the cart");
      expect(model.items.length).to.equal(3, "after an item with an existing type is added, the length of the items array must remain the same as before");
      // the new items should exist
      expect(model.items).to.include(furnitureConst[1], "after an item with an existing type is added, it must be in the cart");
      expect(model.items).to.include(furnitureConst[3], "after an item with an existing type is added, items with a different type must remain in the cart");
      expect(model.items).to.include(furnitureConst[5], "after an item with an existing type is added, items with a different type must remain in the cart");

    });



  });

  describe("W1 getting individual items in IkeaSource.getFurnitureDetails (filter() and undefined exercise)", function getIndividualFurnitureSuiteCB() {
    it("gets the correct items", function getFurnitureTestCB() {
      const furniture1 = IkeaSource.getFurnitureDetails(1);
      expect(furniture1.id).to.equal(1, "the ID of the returned items mustt be the number passed to getFurnitureDetails()");
      expect(furniture1).to.equal(furnitureConst[0], "the returned items must have the items from furnitureConst that has the respective ID");

      const furniture100 = IkeaSource.getFurnitureDetails(100);
      expect(furniture100.id).to.equal(100, "the ID of the returned items mustt be the number passed to getFurnitureDetails()");
      expect(furniture100).to.equal(furnitureConst[3], "the returned items must have the items from furnitureConst that has the respective ID");
    });

    it("returns undefined if items is not found", function furnitureNotFoundTestCB() {
      const result1 = IkeaSource.getFurnitureDetails(-1);
      expect(result1).to.equal(undefined, "if the items with the indicated ID does not exist in furnitureConst, undefined must be returned");

      const result2 = IkeaSource.getFurnitureDetails();
      expect(result2).to.equal(undefined, "if the items with the indicated ID does not exist in furnitureConst, undefined must be returned");
    });
  });

  describe("W1: searching items in furnitureConst (filter() and conditional exercises)", function w2SearchFurnitureSuiteCB() {
    it("returns all items if no search criteria are specified", function allFurnitureReturnedIfNoSearchCriteriaCB() {
      const allFurniture = IkeaSource.searchFurniture({});
      expect(allFurniture.length).to.equal(7, "all items must be returned if no search parameters are specified");
      expect(allFurniture).to.include.deep.members(furnitureConst, "all items must be returned if no search parameters are specified");
    });

    it("returns the correct items type", function correctFurnitureOfTypeTestCB() {
      let items = IkeaSource.searchFurniture({ type: "seating" });
      let expected = [furnitureConst[0], furnitureConst[1], furnitureConst[2]];
      const allType = "all items with a certain type must be returned";
      expect(items).to.include.deep.members(expected, allType);
      expect(items.length).to.equal(expected.length, allType);

      items = IkeaSource.searchFurniture({ type: "table" });
      expected = [furnitureConst[3], furnitureConst[4]];
      expect(items).to.include.deep.members(expected, allType);
      expect(items.length).to.equal(expected.length, allType);
    });

    it("filter by items name", function filterWithKeywordsTestCB() {
      let items = IkeaSource.searchFurniture({ query: "Reading" });
      const allQuery = "if an item name includes the given query, it must be present in the results";
      expect(items.length).to.equal(1, allQuery);
      expect(items[0]).to.equal(furnitureConst[0]);

      items = IkeaSource.searchFurniture({ query: "Bookshelf" });
      expect(items.length).to.equal(1, allQuery);
      expect(items[0]).to.equal(furnitureConst[5]);

      items = IkeaSource.searchFurniture({ query: "Table" });
      expect(items.length).to.equal(2, allQuery);
      expect(items).to.include.deep.members([furnitureConst[3], furnitureConst[4]], allQuery);
    });

    it("returns correct items with given name and type", function correctFurnitureWithFilterAndTypeCB() {
      let items = IkeaSource.searchFurniture({ type: "seating", query: "Stool" });
      expect(items.length).to.equal(2, "when both type and name are specified, only the items that fulfills those condition should be returned");
      expect(items).to.include.deep.members([furnitureConst[1], furnitureConst[2]]);
      items = IkeaSource.searchFurniture({ type: "table", query: "Table" });
      expect(items.length).to.equal(2, "when both type and name are specified, only the items that fulfills those condition should be returned");
      expect(items).to.include.deep.members([furnitureConst[3], furnitureConst[4]]);

      items = IkeaSource.searchFurniture({ type: "table", query: "" });
      let expected = [furnitureConst[3], furnitureConst[4]];
      expect(items.length).to.equal(expected.length, "empty name string will be considered unspecified");
      expect(items).to.include.deep.members(expected, "empty name string will be considered unspecified");


      items = IkeaSource.searchFurniture({ query: "Stool", type: "" });
      expect(items.length).to.equal(2, "empty type string will be considered unspecified");
      expect(items).to.include.deep.members([furnitureConst[1], furnitureConst[2]], "empty type string will be considered unspecified");
    });

    it("returns an empty array, if no items with the search criteria is found", function noFurnitureWithFilterAndTypeCB() {
      const items = IkeaSource.searchFurniture({ type: "storage", query: "Stool" });
      expect(items.length).to.equal(0, "there is no storage Stool, so this should return empty array");
    });

  });

  describe("W2: make W1 methods functional", function w1MethodsFunctionalSuiteCB() {
    testFunctional(IkeaSource.getFurnitureDetails, true);
    noAssignment(IkeaSource.getFurnitureDetails);

    testFunctional(model.addToCart);
    noAssignment(model.addToCart, true);

    testFunctional(model.removeFromCart, true);
    noAssignment(model.removeFromCart, true);

    testFunctional(model.getItemOfType, true);
    noAssignment(model.getItemOfType);
  });

  describe("W2 immutable state", function w2ImmutableStateSuiteCB() {
    it("addToCart creates new items array", function immutableAddToCartTestCB() {
      const old = model.items;
      model.addToCart(furnitureConst[3]);
      expect(model.items).to.not.equal(old, "when an item is added to the cart, a new items array should be created rather than appending to the old one. This checks that you have used immutable Array operation(s) for the addition");
    });
    it("removeFromCart creates new items array", function imutableRemoveFromCartTestCB() {
      model.items = [furnitureConst[5]];
      const x = model.items;
      model.removeFromCart({ id: 200 });
      expect(model.items).to.not.equal(x, "when an item is removed from the cart, a new items array should be created rather than appending to the old one. This checks that you have used immutable Array operation(s) for the removal");
    });
    it("getCart returns a copy, so the caller cannot mutate the model's items array", function getCartReturnsCopyTestCB() {
      model.items = [furnitureConst[5], furnitureConst[3]];
      expect(model.getCart()).to.not.equal(model.items, "getCart must return a different array from the model items array");
      expect(model.getCart()).to.deep.equal([furnitureConst[5], furnitureConst[3]], "the array returned by getCart() must have the same elements as the model items array");
    });

    /*
    it("The constructor makes a copy of the given array so nobody can inadvertently change the FurnitureModel items", function constructorCopyTestCB() {
        const x= [furnitureConst[3], furnitureConst[4]];
        model= new FurnitureModel(7, x);
        expect(model.items).to.not.equal(x, "the model items will not be the same array as the one passed as parameter, but a copy");
        expect(model.items).to.deep.equal(x, "the model items array will contain the same elements as the passed array");
    });*/

  });

  describe("W2 totals (reduce() and functional programming exercises)", function w2TotalsSuiteCB() {
    it("items price (IkeaSource.getFurniturePrice())", function furniturePriceTestCB() {
      noIkeaSource(IkeaSource.getFurniturePrice);
      const furniturePriceMsg = "price of an item must be the sum of its part prices multiplied by part quantity";
      expect(IkeaSource.getFurniturePrice(furnitureConst[1])).to.equal(131, furniturePriceMsg);
      expect(IkeaSource.getFurniturePrice(furnitureConst[3])).to.equal(470, furniturePriceMsg);
    });
    testFunctional(IkeaSource.getFurniturePrice, true);
    noAssignment(IkeaSource.getFurniturePrice);
    it("total price (FurnitureModel.getCartPrice())", function totalPriceTestCB() {
      model.items = [furnitureConst[3], furnitureConst[1]];
      expect(model.getCartPrice()).to.equal(2 * (470 + 131), "price of the cart must be the sum of its items prices, multiplied with the number of copies");
    });
    testFunctional(model.getCartPrice, true);
    noAssignment(model.getCartPrice);
  });

  describe("W2 function chains", function w2FunctionChainCB() {
    it("IkeaSource.searchFurniture should be a function chain like array.filter(checkTypeCB).filter(checkNameCB)", function checkChainCB() {
      const text = removeComments(IkeaSource.searchFurniture);
      const chainMatches = [...text.matchAll(/\)\s*\.\s*filter\s*\(/g)];
      expect(chainMatches.length, "searchFurniture must have two filters directly chained like .filter(...).filter(...), not separated by assignment").to.equal(1);
    });
    testFunctional(IkeaSource.searchFurniture, true);
    noAssignment(IkeaSource.searchFurniture);
  });
  describe("Bonus 1: using objects as dictionaries", function w1getPartsCB() {

    it("getParts", function partsTestCB() {
      noIkeaSource(model.getParts);

      model.items = [furnitureConst[0]];
      const ret1 = model.getParts();

      expect(ret1).to.include.deep.members(furnitureConst[0].parts, "when only one item is in the cart, getParts will return an array containing a copy of each part of that items");
      expect(ret1.length).to.equal(furnitureConst[0].parts.length, "when only one item is in the cart, getParts will return an array containing a copy of each part of that items");

      const because = " because quantities will be added up and we don't want to change anything in furnitureConst!";
      expect(ret1).to.not.equal(furnitureConst[0].parts, "the array returned by getParts must be different from the parts array of any items " + because);

      const differentObject = "the parts returned by getParts must be different from the part objects of any items (use object cloning!)" + because;

      expect(ret1[0]).to.not.equal(furnitureConst[0].parts[0], differentObject);
      expect(ret1[3]).to.not.equal(furnitureConst[0].parts[3], differentObject);

      model.items = [furnitureConst[0], furnitureConst[3]];
      const returned = model.getParts();

      const addUp = "if a part name is present in multiple items from the cart, their quantities must be added up";
      expect(returned).to.include.deep.members([{ name: "wood bolt", quantity: 28, unit: 'pcs', price: 1 }], addUp + " . Part names must be exactly the same, ===; quantities of parts with similar names will not be added up!");

      const expected = [{ "name": "oak leg", "quantity": 4, "unit": "pcs", "price": 45 }, { "name": "seat frame", "quantity": 1, "unit": "", "price": 90 }, { "name": "foam cushion", "quantity": 2, "unit": "pcs", "price": 120 }, { "name": "wood bolt", "quantity": 28, "unit": "pcs", "price": 1 }, { "name": "tabletop", "quantity": 1, "unit": "", "price": 200 }, { "name": "birch leg", "quantity": 4, "unit": "pcs", "price": 50 }, { "name": "corner bracket", "quantity": 4, "unit": "pcs", "price": 6 }, { "name": "support beam", "quantity": 1, "unit": "", "price": 30 }];
      expect(returned).to.include.deep.members(expected, addUp);
      expect(returned.length).to.equal(expected.length, "the length of the part list should be equal to the total number of parts from the items, where parts with the same name are counted only once");
    });

  });


  describe("Bonus 2: function chains, reduce() with array/object accumulators", function bonusSuiteCB() {
    it("getParts  should be a function chain like array.reduce(CB1, acc1).reduce(CB2, acc2)", function checkChainCB() {
      const matches = [...removeComments(model.getParts).matchAll(/\.reduce\s*\(/g)];
      expect(matches.length, "getParts  should be a reduce function chain of two reduce()").to.equal(2);
    });
    testFunctional(model.getParts);
    noAssignment(model.getParts);
  });

});

