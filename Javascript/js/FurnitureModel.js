/* FurnitureModel: instead of a class, we use a plain object literal assigned to a const.
   note that you always need to use "this." when you refer to an object property!
*/

const FurnitureModel = {
  copies: 2, items: [],

  /* Week 1: Set the number of copies to the given value.
     The value must be a positive integer, throw an Error otherwise.
     To check for integer, see the JavaScript Number class (see constants and data types in course material)
   */
  setNumberOfCopies(num) {
    if (!Number.isInteger(num) || num <= 0){
      throw "number of copies not a positive integer"
    }

      this.copies = num
    
  },

  /* Week 1:  add an item to the cart. If an item with the same type already exists, remove it first.
  */
  addToCart(item) {
    function otherTypeCB(existingItem){
     return existingItem.type !== item.type
    }

    this.items = [...this.items.filter(otherTypeCB), item]
    // a possible stepwise way to approach this:
    // 1: use "array spread syntax" to append to the items.
    // 2: to pass all addToCart tests (maybe after implementing removeFromCart and getItemOfType) use filter(CB) to remove the item with the same type (if any) and append the item to the filter() result
  },

  /* Remove item from the cart. Identify the item by its id. The parameter is an object which has an id property.
     FurnitureModel.removeFromCart({id:3})
     See array.filter(CB) in course material
   */
  removeFromCart(item) {
    function isIdCB(existingItem){
     return existingItem.id !== item.id
    }
    
    this.items = this.items.filter(isIdCB)
  
  },

  /* Week 1: Return the item of the given type from the cart, or undefined if no item of the indicated type is in the cart */
  getItemOfType(type) {
    function matchesTypeCB(existingItem){
      return existingItem.type === type;

    }
    return this.items.filter(matchesTypeCB)[0];

  },

  /* Return the cart for code outside the object that may need it */
  getCart() {
    return [...this.items]
  },

  /* Week 2: Total price for the cart given the number of copies
   */
  getCartPrice() {
    function reducerCB(acc, item){
      return IkeaSource.getFurniturePrice(item) + acc
    }
    return this.getCart().reduce(reducerCB, 0) * this.copies
  },

  /* Week 1 Bonus: Return an array of parts for the FurnitureModel items, with each part showing up maximum once, and the quantities added up.
     Assume that the part measurement units and prices are the same in all items that use a certain part.

     Hint: use the fact that JS objects are Dictionaries, you can use the part name as key
     - therefore you can check whether you have encountered a certain part (if so, add the quantity)
     - if you have not encountered the part yet, just set the initial quantity

     Week 2 Bonus: implement functionally, with no assignments, using a method chain and and object cloning
  */
   getParts() {
    function getPartsCB(allParts, item){
      return [...allParts, ...item.parts];
    }

    function mergePartsCB(dict, part){
      return {
        ...dict,
        [part.name]: dict[part.name]
          ? { ...dict[part.name], quantity: dict[part.name].quantity + part.quantity }
          : { ...part },
      };
    }

    return Object.values(this.items.reduce(getPartsCB, []).reduce(mergePartsCB, {}));
  },
};


/* A source of item data, implemented with data from furnitureConst.js. 
 
   We illustrate another way to define an object with methods: simply use an object literal rather than a class. 
*/
const IkeaSource = {
  /* Week 1: Returns a item of specific ID, filter(CB) exercise */
  getFurnitureDetails(id) {
    function matchedId(item){
      return item.id === id;
    }
    //TODO 
    return furnitureConst.filter(matchedId)[0];
  },

  /*
     Week 1: Search for furniture (filter(CB) exercise).
     searchParam can have the following properties (search criteria):
     - type: the furniture type
     - query: free text in furniture name, see the someString.includes(x) JS method
     If no search criterion is specified, all furniture is returned.
     Example use:
     IkeaSource.searchFurniture({type:"seating", query:"Stool"})   returns e.g. stools marked as seating
     IkeaSource.searchFurniture({type:"seating"})
     IkeaSource.searchFurniture({query:"Table"})
     IkeaSource.searchFurniture({type:""})  returns all furniture
     IkeaSource.searchFurniture({query:""})  returns all furniture
     IkeaSource.searchFurniture({})  returns all furniture
 
     Week 2: to implement functionally, without any (procedural) if() statement, note that x.includes("") always returns true. So use a logical experssion that evaluates to "" if the query is absent from searchParams. Same for the type.
  */
  searchFurniture(searchParams) {
    function searchNameCB(a){
    }
    function searchTypeCB(item){
     return item.type.includes(searchParams.type || "")
    }
    
    function searchNameCB(item){
     return item.name.includes(searchParams.query || "")
            
    }

    return furnitureConst.filter(searchTypeCB).filter(searchNameCB);
    //TODO 
  }, // comma after last object member (property, method) is accepted, so that members can easily be moved around

  /* Week 2: Utility method do compute a item price depending on its item prices and quantities.
    see reduce(CB, acc) in course material
  */
  getFurniturePrice(item) {
    function reducerCB(acc, part){
      return part.price * part.quantity + acc;
    }

    return item.parts.reduce(reducerCB,0);
  },

};  /* good to have a semicolon after a let or const declaration */

