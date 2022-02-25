import app from '../../../server'
import supertest from 'supertest'

const request = supertest(app);

it('post and get recipes', async () => {

  const recipe = {
    title: "halla",
    description: "beskrivelse",
    duration: 100,
    ingredients: []
  }

  const postResponse = await request.post('/recipes').send(recipe)

  expect(postResponse.status).toBe(200)

  const getResponse = await request.get(`/recipe/${postResponse.body.data._id}`)

  let initial = true
  const success = Object.keys(recipe).reduce((a, b) =>  a && getResponse.body.data[b] != undefined, initial)

  expect(success).toBeTruthy()
})