import express from 'express';
import morgan from 'morgan';
import renderRouter from './middleware/renderRouter';
import apiRouter from './middleware/apiRouter';

const PORT = 3000;
const app = express();

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', renderRouter);
app.use('/api', apiRouter);

app.listen(PORT, () => console.log(`App has started on port ${PORT}`));
