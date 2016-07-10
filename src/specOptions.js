export default {
    addCartCommand: "http://www.plonter.co.il/Products_ShoppingCart.tmpl?command=add&cart=14681701055765449&db=%5Ecatalog.txt&lang=heb&sku={productId}&submit1.x=93&submit1.y=15&quantity={quantity}",

    products: [
    //CPU
    {
        id: "1",
        name: "i7",
        manufacturer: "Intel",
        categoryId: 1,
        chipsetId: 1,
        caseType: 1,
        price: 100
    }, {
        id: "2",
        name: "i5",
        manufacturer: "Intel",
        categoryId: 1,
        chipsetId: 1,
        caseType: 1,
        price: 142
    }, {
        id: "3",
        name: "i7 4500",
        manufacturer: "Intel",
        categoryId: 1,
        chipsetId: 1,
        caseType: 1,
        price: 221
    }, {
        id: "18ja-zjc",
        name: "Phenom 2",
        manufacturer: "AMD",
        categoryId: 1,
        chipsetId: 1,
        caseType: 1,
        price: 184
    },
    //GPU
    {
        id: "4",
        name: "1080 GTX",
        manufacturer: "Nvidia",
        categoryId: 2,
        chipsetId: 1,
        caseType: 1,
        price: 310
    },
    //MEM
    {
        id: "5",
        name: "16GB DDR 4",
        manufacturer: "Corsair",
        categoryId: 3,
        chipsetId: 1,
        caseType: 1,
        price: 499
    },
    //Storage
    {
        id: "6",
        name: "1TB 7200",
        manufacturer: "WD",
        categoryId: 4,
        chipsetId: 1,
        caseType: 1,
        price: 610
    },
    //Case type
    {
        id: "7",
        name: "ATX",
        categoryId: 6,
        chipsetId: 1,
        caseType: 1,
        price: 201
    },
    //Optical drive
    {
        id: "8",
        name: "Hitachi ODD",
        categoryId: 7,
        chipsetId: 1,
        caseType: 1,
        price: 505
    }

    ],

    categories: [{
        id: 1,
        name: "CPU"
    }, {
        id: 2,
        name: "GPU"
    }, {
        id: 3,
        name: "Memory"
    }, {
        id: 4,
        name: "Storage"
    }, {
        id: 5,
        name: "Motherboard"
    }, {
        id: 6,
        name: "Case"
    }, {
        id: 7,
        name: "Optical drive"
    }],

    chipset: [{
        id: 1,
        name: "Intel 6th Generation LGA1151 Skylake Series DDR4"
    }, {
        id: 2,
        name: "Intel 4th/5th Generation LGA1150 Haswell/Broadwell Series"
    }, {
        id: 3,
        name: "Intel LGA2011-3 Haswell-E Series X99 Chipset/DDR4"
    }, {
        id: 4,
        name: "all Intel - PRO Users"
    }],

    caseTypes: [{
        id: 1,
        name: "ATX"
    }, {
        id: 2,
        name: "ITX"
    }, {
        id: 3,
        name: "HTPC"
    }]
};
