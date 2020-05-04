const router = require('express').Router({mergeParams: true});
const helper = require('../../utils/coachMeHelpers');
const clientDB = require('../../models/client-model');

const authWare = require('../../middleware/auth/globalAuth');

router.get('/', /*authWare.private,*/ async (req, res) => {
    try {
        res.json( await clientDB.getHealthData( req.params.id, req.query?.count, req.query?.metrics ) );
    } catch (error){
        helper.catchError(res, error);
    }
});

router.post('/', /*authWare.userOnly,*/ async (req, res) => {
    try {
        res.json( await clientDB.addHealthData( req.params.id, req.body ) );
    } catch (error){
        helper.catchError(res, error);
    }
});

module.exports = router;