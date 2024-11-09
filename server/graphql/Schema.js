const MovieDAO = require('../dao/movieDAO');

const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
const {GraphQLID} = require("graphql/type");

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: {
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        overview: { type: GraphQLString },
        release_date: { type: GraphQLString },
        vote_average: { type: GraphQLString }
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return MovieDAO.getAll();
            }
        },
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return MovieDAO.getById(args.id);
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createMovie: {
            type: MovieType,
            args: {
                title: { type: GraphQLString },
                overview: { type: GraphQLString },
                release_date: { type: GraphQLString },
                vote_average: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const { title, overview, release_date, vote_average } = args;
                return await MovieDAO.create({ title, overview, release_date, vote_average });
            }
        },
        updateMovie: {
            type: MovieType,
            args: {
                id: { type: GraphQLID },
                title: { type: GraphQLString },
                overview: { type: GraphQLString },
                release_date: { type: GraphQLString },
                vote_average: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const { id, title, overview, release_date, vote_average } = args;
                return await MovieDAO.update(id, {title, overview, release_date, vote_average});
            }
        },
        deleteMovie: {
            type: MovieType,
            args: {
                id: { type: GraphQLID }
            },
            async resolve(parent, args) {
                const { id } = args;
                return await MovieDAO.delete(id);
            }
        }
    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

module.exports = schema;