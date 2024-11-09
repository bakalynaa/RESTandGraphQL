const express = require('express');
const mongoose = require('mongoose');
const movieRoutes = require('./routes/movieRoutes');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');


const PORT = 8000;
const URL = 'mongodb+srv://anastasia:Fyfcnfcsz1403@cluster0.ylx81.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0'

const app = express();


mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true,})
    .then(res => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());
app.use('/api', movieRoutes);

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
