const express = require('express');
const { createShippingPartner, getAllShippingPartners, getShippingPartnerById, updateShippingPartner, deleteShippingPartner } = require('../../../controllers/Dashboard/website_config/shippingPartnerContoller');
const router = express.Router();


router.post('/addShippingPartners', createShippingPartner);
router.get('/shippingPartners', getAllShippingPartners);
router.get('/shippingPartnersById/:id', getShippingPartnerById);
router.put('/updateShippingPartners/:id', updateShippingPartner);
router.delete('/deleteShippingPartners/:id', deleteShippingPartner);

module.exports = router;
