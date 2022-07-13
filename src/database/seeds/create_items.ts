import { Knex } from "knex"

export async function seed(knex: Knex){
    await knex('items').insert([
        { title: "Papéis e Papelão", image: "papel.png"},
        { title: "vidros e Lâmpadas", image: "vidro.png"},
        { title: "Óleo e Cozinha", image: "oleo.png"},
        { title: "Residuos Orgânicos", image: "organico.png"},
        { title: "Baterias e Pilhas", image: "bateria.png"},
        { title: "Eletrônicos", image: "eletronico.png"},
    ])
}