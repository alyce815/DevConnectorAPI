import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Issue from '/models/Issue';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://[server]/issues');

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});
router.route('/issues.add').post((req, res) => {
    let issue = new Issue (req.body);
    issue.save()
      .then(issue => {
          res.status(200).json({'issue': 'Added sucessfully'});
      })
      .catch(err => {
          res.status(400).send('Failed to create new record');
      });

});