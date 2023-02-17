/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const defWorkers= [
  {
    firstname:"Kenan",
    lastname:"Aksoy",
    departman:"Bakım"
  },
  {
    firstname:"Yusuf",
    lastname:"Ak",
    departman:"Bakım"
  },
  {
    firstname:"Ali",
    lastname:"Kara",
    departman:"Elektrik"
  }
];
const defEnginers = [
  {
    firstname: "Samet",
    lastname: "Kılıç",
    title: "Bilg Müh"
  },
  {
    firstname: "Yuşa",
    lastname: "Topuz",
    title: "Mak Müh"
  },
  {
    firstname: "Akın",
    lastname: "Sezer",
    title: "End Müh"
  }
];
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return knex("workers").insert(defWorkers)
  .then(() => {
    return knex("engineers").insert(defEnginers);
  }) 
};