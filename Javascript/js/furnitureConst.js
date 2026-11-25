// the furniture constant contains an array of all the
// furniture pieces in the database. Each piece has id, name, type,
// and an array of parts. Each part has name,
// quantity (a number), price (a number) and unit (string)
const furnitureConst = [{
  'id': 1,
  'name': 'Reading Nook Chair',
  'type': 'seating',
  'image': 'chair.jpg',
  'description': "Assemble the four legs onto the seat frame. Attach the backrest, then fit the foam cushions into place. Tighten all bolts and enjoy a cozy corner for reading.",
  'parts': [{
    'name': 'oak leg',
    'quantity': 4,
    'unit': 'pcs',
    'price': 45
  }, {
    'name': 'seat frame',
    'quantity': 1,
    'unit': '',
    'price': 90
  }, {
    'name': 'foam cushion',
    'quantity': 2,
    'unit': 'pcs',
    'price': 120
  }, {
    'name': 'wood bolt',
    'quantity': 12,
    'unit': 'pcs',
    'price': 1
  }]
}, {
  'id': 2,
  'name': 'Folding Stool',
  'type': 'seating',
  'image': 'stool.jpg',
  'description': "Here is how you assemble it... Lore ipsum...",
  'parts': [{
    'name': 'pine leg',
    'quantity': 4,
    'unit': 'pcs',
    'price': 20
  }, {
    'name': 'canvas seat',
    'quantity': 1,
    'unit': '',
    'price': 35
  }, {
    'name': 'hinge',
    'quantity': 2,
    'unit': 'pcs',
    'price': 8
  }]
}, {
  'id': 3,
  'name': 'Bar Stool',
  'type': 'seating',
  'image': 'barstool.jpg',
  'description': "Here is how you assemble it... Lore ipsum...",
  'parts': [{
    'name': 'steel post',
    'quantity': 1,
    'unit': '',
    'price': 60
  }, {
    'name': 'round seat pad',
    'quantity': 1,
    'unit': '',
    'price': 40
  }, {
    'name': 'base plate',
    'quantity': 1,
    'unit': '',
    'price': 55
  }]
}, {
  'id': 100,
  'name': 'Dining Table',
  'type': 'table',
  'image': 'diningtable.jpg',
  'description': "Lay the tabletop upside down on a soft surface. Attach the four legs to the corner brackets and tighten the bolts. Add the support beam across the center for stability, then flip the table upright.",
  'parts': [{
    'name': 'tabletop',
    'quantity': 1,
    'unit': '',
    'price': 200
  }, {
    'name': 'birch leg',
    'quantity': 4,
    'unit': 'pcs',
    'price': 50
  }, {
    'name': 'corner bracket',
    'quantity': 4,
    'unit': 'pcs',
    'price': 6
  }, {
    'name': 'support beam',
    'quantity': 1,
    'unit': '',
    'price': 30
  }, {
    'name': 'wood bolt',
    'quantity': 16,
    'unit': 'pcs',
    'price': 1
  }]
}, {
  'id': 101,
  'name': 'Coffee Table',
  'type': 'table',
  'image': 'coffeetable.jpg',
  'description': "Here is how you assemble it... Lore ipsum...",
  'parts': [{
    'name': 'glass top',
    'quantity': 1,
    'unit': '',
    'price': 110
  }, {
    'name': 'wooden leg',
    'quantity': 4,
    'unit': 'pcs',
    'price': 25
  }, {
    'name': 'shelf board',
    'quantity': 1,
    'unit': '',
    'price': 45
  }]
}, {
  'id': 200,
  'name': 'Bookshelf',
  'type': 'storage',
  'image': 'bookshelf.jpg',
  'description': "Here is how you assemble it... Lore ipsum...",
  'parts': [{
    'name': 'side panel',
    'quantity': 2,
    'unit': 'pcs',
    'price': 70
  }, {
    'name': 'shelf board',
    'quantity': 5,
    'unit': 'pcs',
    'price': 40
  }, {
    'name': 'back panel',
    'quantity': 1,
    'unit': '',
    'price': 35
  }, {
    'name': 'wood screw',
    'quantity': 24,
    'unit': 'pcs',
    'price': 1
  }]
}, {
  'id': 201,
  'name': 'Nightstand',
  'type': 'storage',
  'image': 'nightstand.jpg',
  'description': "Here is how you assemble it... Lore ipsum...",
  'parts': [{
    'name': 'cabinet body',
    'quantity': 1,
    'unit': '',
    'price': 80
  }, {
    'name': 'drawer',
    'quantity': 1,
    'unit': '',
    'price': 45
  }, {
    'name': 'knob',
    'quantity': 1,
    'unit': '',
    'price': 5
  }]
}];

function deepFreeze(object) {
  // Retrieve the property names defined on object
  const propNames = Object.getOwnPropertyNames(object);

  // Freeze properties before freezing self

  for (const name of propNames) {
    const value = object[name];

    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
}

// we ensure that student code does not modify the furniture const. It is not meant to.
deepFreeze(furnitureConst);
