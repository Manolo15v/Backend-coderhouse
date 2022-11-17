import { Router } from 'express';


const router = Router();

router.get('', (req, res) => {
    res.render('pages/messages');
});

export default router;