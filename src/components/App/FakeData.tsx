import { cleanRestaurantData } from './apiFunctions'

const fakeData = [
    {
        "id": "f223fdd0-4adc-423e-9747-980a66c256ca",
        "name": "Old Hickory Steakhouse",
        "address1": "201 Waterfront St",
        "city": "Oxon Hill",
        "state": "MD",
        "zip": "20745",
        "lat": "38.782098",
        "long": "-77.017492",
        "telephone": "(301) 965-4000",
        "tags": "Social,Food and Dining,Restaurants,Steakhouses",
        "website": "http://www.gaylordnational.com",
        "genre": "Steak,American,Contemporary,Seafood,Cafe",
        "hours": "Open Daily 5:30 PM-10:00 PM",
        "attire": "business casual"
    },
    {
        "id": "00b35e1a-82b1-4988-b8b9-6df826db2818",
        "name": "Matsuhisa",
        "address1": "303 E Main St",
        "city": "Aspen",
        "state": "CO",
        "zip": "81611",
        "lat": "39.190723",
        "long": "-106.82031",
        "telephone": "(970) 544-6628",
        "tags": "Social,Food and Dining,Restaurants,Japanese,Social,Food and Dining,Restaurants,Sushi",
        "website": "http://www.matsuhisaaspen.com",
        "genre": "Japanese,Sushi,Asian,Contemporary,Seafood",
        "hours": "Open Daily 5:30 PM-9:00 PM",
        "attire": "business casual"
    },
    {
        "id": "0f41a3d0-0641-4eef-b7fd-706f083cf0d5",
        "name": "Fleurie Restaurant",
        "address1": "108 3rd St NE",
        "city": "Charlottesville",
        "state": "VA",
        "zip": "22902",
        "lat": "38.030526",
        "long": "-78.479785",
        "telephone": "(434) 971-7800",
        "tags": "Social,Food and Dining,Restaurants,French",
        "website": "http://www.fleurierestaurant.com",
        "genre": "French,European,Cafe,Continental,American",
        "hours": "Mon-Thu 5:30 PM-9:00 PM; Fri-Sat 5:30 PM-10:00 PM",
        "attire": "business casual"
    },
    {
        "id": "0b4bfe46-3e60-4de4-82ba-2dd8e5d46b56",
        "name": "The Capital Grille",
        "address1": "500 Crescent Ct",
        "city": "Dallas",
        "state": "TX",
        "zip": "75201",
        "lat": "32.794749",
        "long": "-96.804099",
        "telephone": "(214) 303-0500",
        "tags": "Social,Food and Dining,Restaurants,Steakhouses,Social,Food and Dining,Restaurants,American",
        "website": "http://www.thecapitalgrille.com",
        "genre": "Steak,American",
        "hours": "Mon-Thu 11:00 AM-10:00 PM; Fri 11:00 AM-11:00 PM; Sat 5:00 PM-11:00 PM; Sun 5:00 PM-9:00 PM",
        "attire": "business casual"
    },
    {
        "id": "cd273a24-f8de-44f6-8add-028e22229293",
        "name": "Boston Lobster Feast",
        "address1": "8731 International Dr",
        "city": "Orlando",
        "state": "FL",
        "zip": "32819",
        "lat": "28.43897",
        "long": "-81.470707",
        "telephone": "(407) 248-8606",
        "tags": "Social,Food and Dining,Restaurants,Seafood,Social,Food and Dining,Restaurants,American",
        "website": "http://www.bostonlobsterfeast.com",
        "genre": "Seafood,International,American,Oysters,Cafe",
        "hours": "Mon-Fri 4:00 PM-10:00 PM; Sat-Sun 2:00 PM-10:00 PM",
        "attire": "Casual"
    },
    {
        "id": "9ebb46cd-d4db-4a31-b3a9-dfe41b6c329f",
        "name": "Earth",
        "address1": "354 Goose Rocks Rd",
        "city": "Kennebunkport",
        "state": "ME",
        "zip": "04046",
        "lat": "43.413001",
        "long": "-70.428904",
        "telephone": "(207) 967-6550",
        "tags": "Social,Food and Dining,Restaurants,American,Social,Bars",
        "website": "http://www.earthathiddenpond.com",
        "genre": "American,Contemporary",
        "hours": "Open Daily 5:30 PM-9:30 PM",
        "attire": "Casual"
    },
    {
        "id": "71764c4a-52fc-4565-8f5a-19fed53ef049",
        "name": "The Capital Grille",
        "address1": "16489 N Scottsdale Rd",
        "city": "Scottsdale",
        "state": "AZ",
        "zip": "85254",
        "lat": "33.637215",
        "long": "-111.924262",
        "telephone": "(480) 348-1700",
        "tags": "Social,Food and Dining,Restaurants,Steakhouses,Social,Food and Dining,Restaurants,American",
        "website": "http://www.thecapitalgrille.com",
        "genre": "Steak,American",
        "hours": "Mon-Thu 11:00 AM-10:00 PM; Fri 11:00 AM-11:00 PM; Sat 5:00 PM-11:00 PM; Sun 5:00 PM-9:00 PM",
        "attire": "business casual"
    },
    {
        "id": "0491b590-5bc4-4899-957a-4659d01b1049",
        "name": "Angelo's 677 Prime",
        "address1": "677 Broadway",
        "city": "Albany",
        "state": "NY",
        "zip": "12207",
        "lat": "42.653271",
        "long": "-73.748583",
        "telephone": "(518) 427-7463",
        "tags": "Social,Food and Dining,Restaurants,Steakhouses,Social,Food and Dining,Restaurants,Seafood,Social,Food and Dining,Restaurants,American",
        "website": "http://www.677prime.com",
        "genre": "Steak,American,Seafood,International,Traditional",
        "hours": "Mon-Fri 11:30 AM-10:00 PM; Sat 5:30 PM-10:00 PM",
        "attire": "business casual"
    },
    {
        "id": "673d4ab1-8850-4a69-9a25-36a98f584ce6",
        "name": "Feast at Lele",
        "address1": "505 Front St",
        "city": "Lahaina",
        "state": "HI",
        "zip": "96761",
        "lat": "20.867754",
        "long": "-156.675512",
        "telephone": "(808) 667-5353",
        "tags": "Social,Food and Dining,Restaurants,International",
        "website": "http://www.feastatlele.com",
        "genre": "Hawaiian,Polynesian,Pacific Rim,Cafe,Vietnamese",
        "hours": "Open Daily 5:30 PM-8:30 PM",
        "attire": "business casual"
    },
    {
        "id": "8a936f27-bcf4-485b-9522-219451bc8cec",
        "name": "Cafe Cimino Country Inn",
        "address1": "616 Main St",
        "city": "Sutton",
        "state": "WV",
        "zip": "26601",
        "lat": "38.663967",
        "long": "-80.704248",
        "telephone": "(304) 765-2913",
        "tags": "Social,Food and Dining,Restaurants,Italian,Social,Food and Dining,Cafes,Coffee and Tea Houses",
        "website": "http://www.cafeciminocountryinn.com",
        "genre": "Cafe,Italian,Bistro,Contemporary,Vegetarian",
        "hours": "Tue 4:00 PM-9:00 PM; Wed-Sat 5:00 PM-9:00 PM",
        "attire": "business casual"
    },
    {
        "id": "3e394ac5-f9da-4923-ac83-a9c59fe3b195",
        "name": "La Mer",
        "address1": "2199 Kalia Rd",
        "city": "Honolulu",
        "state": "HI",
        "zip": "96815",
        "lat": "21.277744",
        "long": "-157.832012",
        "telephone": "(808) 923-2311",
        "tags": "Social,Food and Dining,Restaurants,French,Social,Food and Dining,Restaurants,Seafood",
        "website": "http://www.halekulani.com/dining/la_mer/",
        "genre": "French,Hawaiian,Seafood,European,Vegetarian",
        "hours": "Open Daily 5:30 PM-9:30 PM",
        "attire": "formal"
    },
    {
        "id": "a871ef20-fd03-4a3d-81a3-8ff8089b911a",
        "name": "Rocco's Cheesecake",
        "address1": "1701 Pico Blvd",
        "city": "Santa Monica",
        "state": "CA",
        "zip": "90405",
        "lat": "34.017988",
        "long": "-118.472702",
        "telephone": "(310) 396-1701",
        "tags": "Social,Food and Dining,Bakeries,Social,Food and Dining,Cafes,Coffee and Tea Houses,Social,Food and Dining,Restaurants",
        "website": "http://www.roccoscheesecake.com",
        "genre": "Coffee",
        "hours": "Mon-Thu 11:00 AM-8:00 PM; Fri 11:00 AM-10:00 PM; Sat 10:00 AM-10:00 PM; Sun 11:00 AM-8:00 PM",
        "attire": "Casual"
    },
    {
        "id": "6f305792-12a2-4501-9559-6884348931db",
        "name": "Ireland's Steakhouse",
        "address1": "250 Racquet Club Rd",
        "city": "Weston",
        "state": "FL",
        "zip": "33326",
        "lat": "26.12478",
        "long": "-80.376143",
        "telephone": "(954) 349-5656",
        "tags": "Social,Food and Dining,Restaurants,Steakhouses,Social,Food and Dining,Restaurants,American",
        "website": "http://www.bonaventureresortandspa.com/restaurants_and_lounges/",
        "genre": "Steak,American,Seafood,Irish,Cafe",
        "hours": "Tue-Sat 5:30 PM-10:30 PM",
        "attire": "casual"
    },
    {
        "id": "651628a1-9cea-4755-ac68-eaed5a0bb188",
        "name": "A Chef's Kitchen",
        "address1": "501 Prince George St",
        "city": "Williamsburg",
        "state": "VA",
        "zip": "23185",
        "lat": "37.272483",
        "long": "-76.707708",
        "telephone": "(757) 564-8500",
        "tags": "Social,Food and Dining,Restaurants,American,Social,Food and Dining,Restaurants,Seafood",
        "website": "http://www.achefskitchen.biz",
        "genre": "American,Seafood,International,Asian,Cafe",
        "hours": "Tue-Sat 10:00 AM-5:30 PM",
        "attire": "business casual"
    },
    {
        "id": "02d3bff4-9381-4abf-914e-787bd6ecc099",
        "name": "Artisanal Restaurant",
        "address1": "1200 Dobbins Rd",
        "city": "Banner Elk",
        "state": "NC",
        "zip": "28604",
        "lat": "36.15378",
        "long": "-81.840418",
        "telephone": "(828) 898-5395",
        "tags": "Social,Food and Dining,Restaurants,American",
        "website": "http://www.artisanalnc.com",
        "genre": "American,Contemporary",
        "hours": "Tue-Sun 5:30 PM-10:00 PM",
        "attire": "business casual"
    },
    {
        "id": "bdec889f-56d0-44dc-9297-d47f54094c3c",
        "name": "Lulou's Restaurant",
        "address1": "1470 S Virginia St",
        "city": "Reno",
        "state": "NV",
        "zip": "89502",
        "lat": "39.510017",
        "long": "-119.805054",
        "telephone": "(775) 329-9979",
        "tags": "Social,Food and Dining,Restaurants,Italian,Social,Food and Dining,Restaurants,American",
        "website": "http://lulous.restaurantwebexpert.com",
        "genre": "Italian,American,Contemporary,European,International",
        "hours": "Tue-Sat 5:00 PM-8:30 PM",
        "attire": "business casual"
    },
    {
        "id": "06e48e5a-6af2-4a04-97dd-fbf61ef46dd6",
        "name": "Byrd & Baldwin Bros Steakhouse",
        "address1": "116 Brooke Ave",
        "city": "Norfolk",
        "state": "VA",
        "zip": "23510",
        "lat": "36.848861",
        "long": "-76.291773",
        "telephone": "(757) 222-9191",
        "tags": "Social,Food and Dining,Restaurants",
        "website": "https://www.byrdbaldwin.com/",
        "genre": "Steak",
        "hours": "Mon-Thu 5:00 PM-9:30 PM; Fri-Sat 5:00 PM-10:30 PM; Sun 5:00 PM-8:30 PM",
        "attire": "business casual"
    },
    {
        "id": "b7f72b56-3c89-4d45-9d70-f88d0db62db1",
        "name": "Antoine's Restaurant",
        "address1": "1100 N Tuttle Ave",
        "city": "Sarasota",
        "state": "FL",
        "zip": "34237",
        "lat": "27.347534",
        "long": "-82.513303",
        "telephone": "(941) 331-1400",
        "tags": "Social,Food and Dining,Restaurants,French,Social,Food and Dining,Restaurants,Seafood,Social,Food and Dining,Restaurants,International",
        "website": "http://www.antoinessarasota.com",
        "genre": "European,French,Seafood,Belgian,Vegetarian",
        "hours": "Mon-Sat 5:00 PM-9:00 PM",
        "attire": "casual"
    },
    {
        "id": "eb749df5-4b5d-4a4b-aa0b-b1fb7f53b04d",
        "name": "The Capital Grille",
        "address1": "9101 International Dr",
        "city": "Orlando",
        "state": "FL",
        "zip": "32819",
        "lat": "28.430828",
        "long": "-81.470184",
        "telephone": "(407) 370-4392",
        "tags": "Social,Food and Dining,Restaurants,Steakhouses,Social,Food and Dining,Restaurants,American",
        "website": "http://www.thecapitalgrille.com",
        "genre": "Steak,American",
        "hours": "Mon-Thu 11:30 AM-10:00 PM; Fri 11:30 AM-11:00 PM; Sat 5:00 PM-11:00 PM; Sun 5:00 PM-10:00 PM",
        "attire": "business casual"
    },
    {
        "id": "f087551c-f025-49dc-b903-bed768848c4a",
        "name": "Uchi",
        "address1": "801 S Lamar Blvd",
        "city": "Austin",
        "state": "TX",
        "zip": "78704",
        "lat": "30.25756",
        "long": "-97.75975",
        "telephone": "(512) 916-4808",
        "tags": "Social,Food and Dining,Restaurants,Sushi,Social,Food and Dining,Restaurants,Japanese",
        "website": "http://www.uchiaustin.com",
        "genre": "Japanese,Sushi,Asian,Seafood,American",
        "hours": "Mon-Thu 5:00 PM-10:00 PM; Fri-Sat 5:00 PM-11:00 PM; Sun 5:00 PM-10:00 PM",
        "attire": "smart casual"
    },
    {
        "id": "8838e644-dda5-4f73-9425-8c3f824e955e",
        "name": "Truluck's",
        "address1": "400 Colorado St",
        "city": "Austin",
        "state": "TX",
        "zip": "78701",
        "lat": "30.266751",
        "long": "-97.745",
        "telephone": "(512) 482-9000",
        "tags": "Social,Food and Dining,Restaurants,Seafood,Social,Food and Dining,Restaurants,Steakhouses",
        "website": "http://www.trulucks.com",
        "genre": "Seafood,Steak,American",
        "hours": "Mon-Thu 5:00 PM-10:00 PM; Fri-Sat 5:00 PM-11:00 PM; Sun 5:00 PM-9:00 PM",
        "attire": "business casual"
    },
    {
        "id": "0e2c172d-3cbe-43b9-aeb2-888714ab553b",
        "name": "Halls Chophouse",
        "address1": "434 King St",
        "city": "Charleston",
        "state": "SC",
        "zip": "29403",
        "lat": "32.788524",
        "long": "-79.937963",
        "telephone": "(843) 727-0090",
        "tags": "Social,Food and Dining,Restaurants",
        "website": "http://hallschophouse.com/",
        "genre": "American,Contemporary,Steak",
        "hours": "Mon-Fri 12:00 AM-2:00 AM, 4:00 PM-11:59 PM; Sat 12:00 AM-2:00 AM, 11:00 AM-2:00 PM, 4:00 PM-11:59 PM; Sun 12:00 AM-2:00 AM, 10:00 AM-11:59 PM",
        "attire": "business casual"
    },
    {
        "id": "3fc229de-37a2-4435-8d8b-bb241e95f70f",
        "name": "Company of the Cauldron",
        "address1": "5 India St",
        "city": "Nantucket",
        "state": "MA",
        "zip": "02554",
        "lat": "41.284056",
        "long": "-70.099552",
        "telephone": "(508) 228-4016",
        "tags": "Social,Food and Dining,Restaurants,American,Social,Food and Dining,Restaurants,French",
        "website": "http://www.companyofthecauldron.com",
        "genre": "American,Contemporary,Seafood,Continental,Traditional",
        "hours": "Mon 7:00 PM-10:00 PM; Tue-Sat 6:00 PM-11:00 PM; Sun 7:00 PM-10:00 PM",
        "attire": "business casual"
    },
    {
        "id": "09a3a540-f41d-4d4a-94d3-844d06a354ee",
        "name": "The Boulders",
        "address1": "8363 Lake Land Trl NW",
        "city": "Walker",
        "state": "MN",
        "zip": "56484",
        "lat": "47.112517",
        "long": "-94.609974",
        "telephone": "(218) 547-1006",
        "tags": "Social,Food and Dining,Restaurants,Seafood,Social,Food and Dining,Restaurants,American,Social,Food and Dining,Restaurants,Steakhouses",
        "website": "http://www.thebouldersrestaurant.com",
        "genre": "American,Cafe,Steak,Seafood,Eclectic",
        "hours": "Open Daily 5:00 PM-9:00 PM",
        "attire": "casual"
    },
    {
        "id": "20e5c220-d650-4bc8-bb9d-6938f45ad581",
        "name": "LIFeSTYLE",
        "address1": "108 E Pitt St",
        "city": "Bedford",
        "state": "PA",
        "zip": "15522",
        "lat": "40.018898",
        "long": "-78.503429",
        "telephone": "(814) 623-2703",
        "tags": "Social,Food and Dining,Restaurants,Italian",
        "website": "http://www.italianfoodandstyle.com",
        "genre": "Italian,Contemporary,Pasta,Kosher",
        "hours": "Mon 11:00 AM-3:00 PM; Tue-Thu 10:00 AM-4:00 PM; Fri-Sat 7:30 PM-10:00 PM; Sun 11:00 AM-3:00 PM",
        "attire": "business casual"
    },
    {
        "id": "875ab24b-4bd3-495b-8d70-83b71ede9b2c",
        "name": "Stripsteak",
        "address1": "3950 Las Vegas Blvd S",
        "city": "Las Vegas",
        "state": "NV",
        "zip": "89119",
        "lat": "36.091074",
        "long": "-115.176692",
        "telephone": "(702) 632-7414",
        "tags": "Social,Food and Dining,Restaurants,Steakhouses,Social,Food and Dining,Restaurants,American",
        "website": "http://www.mandalaybay.com",
        "genre": "Steak,American,Seafood,Continental,Contemporary",
        "hours": "Open Daily 4:00 PM-10:00 PM",
        "attire": "business casual"
    },
    {
        "id": "5ba6b952-0115-4efe-bcb3-5361e3a7f4f9",
        "name": "Seven Feathers Casino Resort",
        "address1": "146 Chief Miwaleta Ln",
        "city": "Canyonville",
        "state": "OR",
        "zip": "97417",
        "lat": "42.939297",
        "long": "-123.28358",
        "telephone": "(800) 548-8461",
        "tags": "Social,Food and Dining,Restaurants",
        "website": "https://www.sevenfeathers.com/",
        "genre": "Coffee,Tea",
        "hours": "Open Daily 12:00 AM-11:59 PM",
        "attire": "business casual"
    },
    {
        "id": "ad2cf836-efad-4785-a466-f0e815b66b37",
        "name": "Schermerhorn Symphony Center",
        "address1": "1 Symphony Pl",
        "city": "Nashville",
        "state": "TN",
        "zip": "37201",
        "lat": "36.159944",
        "long": "-86.775699",
        "telephone": "(615) 687-6500",
        "tags": "Social,Entertainment,Music and Show Venues,Social,Food and Dining,Restaurants,American",
        "website": "http://www.nashvillesymphony.org",
        "genre": "Cafe,International,Sandwiches,Vegetarian,American",
        "hours": "Mon-Fri 10:00 AM-6:00 PM; Sat 10:00 AM-2:00 PM",
        "attire": "business casual"
    },
    {
        "id": "7d5f1742-2afb-4249-bf16-21aad7811f9d",
        "name": "Studio Cake",
        "address1": "104 Gilbert Ave",
        "city": "Downtown,The Willows",
        "state": "CA",
        "zip": "94025",
        "lat": "37.458997",
        "long": "-122.152898",
        "telephone": "(650) 326-1019",
        "tags": "Social,Food and Dining,Bakeries",
        "website": "http://www.studiocake.com",
        "genre": "Bakery",
        "hours": "Mon-Fri 8:00 AM-4:00 PM",
        "attire": "casual"
    },
    {
        "id": "ff31ea3b-01e4-4047-8210-d2935322771e",
        "name": "Chatham's Place",
        "address1": "7575 Dr Phillips Blvd",
        "city": "Orlando",
        "state": "FL",
        "zip": "32819",
        "lat": "28.451837",
        "long": "-81.487498",
        "telephone": "(407) 345-2992",
        "tags": "Social,Food and Dining,Restaurants,American,Social,Food and Dining,Restaurants,French,Social,Food and Dining,Restaurants,International",
        "website": "http://www.chathamsplace.com",
        "genre": "American,Traditional,Continental,European,Italian",
        "hours": "Open Daily 5:30 PM-10:00 PM",
        "attire": "business casual"
    },
    {
        "id": "98654e20-d552-46d1-8b27-8c23b1160cc0",
        "name": "Guthrie Theater",
        "address1": "818 S 2nd St",
        "city": "Minneapolis",
        "state": "MN",
        "zip": "55415",
        "lat": "44.978138",
        "long": "-93.255562",
        "telephone": "(612) 377-2224",
        "tags": "Social,Entertainment,Music and Show Venues,Social,Food and Dining,Restaurants",
        "website": "http://www.guthrietheater.org",
        "genre": "American,Traditional,Cafe,Coffee",
        "hours": "Open Daily 8:00 AM-8:00 PM",
        "attire": "casual"
    },
    {
        "id": "0b7c0eea-19c3-4050-a252-056e9ed40919",
        "name": "Farmington Country Club",
        "address1": "1625 Country Club Cir",
        "city": "Charlottesville",
        "state": "VA",
        "zip": "22901",
        "lat": "38.061489",
        "long": "-78.541926",
        "telephone": "(434) 296-5661",
        "tags": "Social,Food and Dining,Restaurants,American",
        "website": "http://www.farmingtoncc.com",
        "genre": "Grill,American",
        "hours": "Mon-Fri 9:00 AM-5:00 PM",
        "attire": "formal"
    },
    {
        "id": "0210a90c-9e58-400d-afd3-f333ac8996d4",
        "name": "Victoria & Albert's",
        "address1": "4401 Floridian Way",
        "city": "Orlando",
        "state": "FL",
        "zip": "32830",
        "lat": "28.411401",
        "long": "-81.58752",
        "telephone": "(407) 939-3862",
        "tags": "Social,Food and Dining,Restaurants",
        "website": "https://disneyworld.disney.go.com/dining/grand-floridian-resort-and-spa/victoria-and-alberts/?CMP=OKC-wdw_dining_pl_187",
        "genre": "American,French,Contemporary,British,Irish",
        "hours": "Open Daily 5:30 PM-7:30 PM",
        "attire": "smart casual"
    },
    {
        "id": "eccdd704-8f39-4587-b07f-25cdb4a0c259",
        "name": "Tony's",
        "address1": "3755 Richmond Ave",
        "city": "Houston",
        "state": "TX",
        "zip": "77046",
        "lat": "29.732121",
        "long": "-95.436021",
        "telephone": "(713) 622-6778",
        "tags": "Social,Food and Dining,Restaurants,Italian,Social,Food and Dining,Restaurants,Seafood,Social,Food and Dining,Restaurants,French",
        "website": "http://www.tonyshouston.com",
        "genre": "Italian,European,French,American,Contemporary",
        "hours": "Mon-Thu 11:00 AM-10:00 PM; Fri 11:00 AM-11:59 PM; Sat 6:00 PM-11:59 PM",
        "attire": "business casual"
    },
    {
        "id": "9ffeee64-787f-4e88-b421-47395688bc8f",
        "name": "Ever So Humble Pie Company",
        "address1": "153 Washington St",
        "city": "East Walpole",
        "state": "MA",
        "zip": "02032",
        "lat": "42.162649",
        "long": "-71.216834",
        "telephone": "(508) 660-9731",
        "tags": "Social,Food and Dining,Restaurants",
        "website": "http://www.eversohumble.com/",
        "genre": "Bakery",
        "hours": "Mon-Fri 8:00 AM-5:00 PM; Sat 8:00 AM-3:00 PM",
        "attire": "casual"
    },
    {
        "id": "9c86d177-8cbc-4c6c-b17c-a3bd97231f09",
        "name": "Gypsy Apple",
        "address1": "65 Bridge St",
        "city": "Shelburne Falls",
        "state": "MA",
        "zip": "01370",
        "lat": "42.603437",
        "long": "-72.738178",
        "telephone": "(413) 625-6345",
        "tags": "Social,Food and Dining,Restaurants,American,Social,Food and Dining,Restaurants,French,Social,Bars",
        "website": "http://www.gypsyapplebistro.com",
        "genre": "Bistro,French,American,Coffee,Fusion",
        "hours": "Thu-Sun 5:00 PM-9:00 PM",
        "attire": "business casual"
    },
    {
        "id": "8fdbd667-8662-48b8-8749-79eeabc8353e",
        "name": "Restaurant Nicholas",
        "address1": "160 State Route 35",
        "city": "Red Bank",
        "state": "NJ",
        "zip": "07701",
        "lat": "40.36201",
        "long": "-74.08091",
        "telephone": "(732) 345-9977",
        "tags": "Social,Food and Dining,Restaurants,American,Social,Food and Dining,Restaurants,French,Social,Food and Dining,Restaurants,Seafood",
        "website": "http://www.restaurantnicholas.com",
        "genre": "American,Contemporary,Traditional,Seafood,Vegetarian",
        "hours": "Tue-Thu 5:30 PM-9:30 PM; Fri-Sat 5:30 PM-10:30 PM; Sun 5:30 PM-9:30 PM",
        "attire": "business casual"
    },
    {
        "id": "509f8ddf-c999-44ba-967e-406585895bbb",
        "name": "Mama's Fish House",
        "address1": "799 Poho Pl",
        "city": "Paia",
        "state": "HI",
        "zip": "96779",
        "lat": "20.929148",
        "long": "-156.366996",
        "telephone": "(808) 579-8488",
        "tags": "Social,Food and Dining,Restaurants",
        "website": "http://www.mamasfishhouse.com",
        "genre": "Seafood",
        "hours": "Open Daily 11:00 AM-9:00 PM",
        "attire": "casual"
    }
]

export default cleanRestaurantData(fakeData)