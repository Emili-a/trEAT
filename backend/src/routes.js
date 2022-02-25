import {Recipe} from './models.js'
import express from 'express'

const router = express.Router();


// get list of all recipes
router.route('/recipes').get((req, res) => {
    Recipe.find({}, (err, found) => {
        if (!err) {
            res.send(found);
        } else {
            console.log(err);
            res.send("Some error occured!")
        }
    });
})

// create a new document
router.route('/recipes').post(async (req, res) => {
    const { body } = req


    const recipe = new Recipe({
        title: body.title,
        description: body.description,
        duration: body.duration,
        ingredients: body.ingredients
    });

    const saveRes = await recipe.save()
    res.json({ data: saveRes })
})


router.route('/recipe/:id').get(async (req, res) => {
    const { params } = req
    let getRes;

    if (!(req.params.id)) {
        getRes = { error: "Badly formatted ID" };
        res.status(400);
    }

    else if(!(typeof params.id == "string")) {
        getRes = {error: "ID is not of type string"};
        res.status(400);
    }

    else if(!(req.params.id.length == 24)) {
        getRes = {error: "ID is of wrong length"};
        res.status(400);
    }
    else {
        getRes = await Recipe.findOne({ _id: params.id })
        if(getRes == null) {
            getRes = {error: "Recipe not found"}
            res.status(204);
        }
        else{
            res.status(200);
        }
    }
    res.send({data: getRes})
})

// create a new recipe
router.route('/recipe/:id').delete(async (req, res) => {
    const { params } = req
    let saveRes;

    if (!req.params.id) {
        saveRes = { error: "Badly formatted ID"};
        res.status(400);
    }

    else if(!(typeof params.id == "string")) {
        saveRes = {error: "ID is not of type string"};
        res.status(400);
    }

    else if(!(req.params.id.length == 24)) {
        saveRes = {error: "ID is of wrong length"};
        res.status(400);
    }
    else {
        saveRes = await Recipe.deleteOne({ _id: params.id })
        res.status(200);
    }
    res.json({ data: saveRes });
});

export default router;