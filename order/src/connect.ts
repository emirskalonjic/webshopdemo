import mongoose from 'mongoose';

type TInput = {
  db: string;
}
export default ({db}: TInput) => {
  
  const connect = () => {

    mongoose
        .connect(
            db
        )
        .then(() => {
            return console.info(`Successfully connected to ${db}`);
        })
        .catch(error => {
            console.error('Error connecting to database: ', error);
            return process.exit(1);
        });
    };

    mongoose.connection.on('connected', () => {
        console.log('Mongoose default connection open to ' + db);
    });

    connect();

    mongoose.connection.on('disconnected', connect);
};