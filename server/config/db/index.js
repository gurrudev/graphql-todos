import { connect } from "mongoose";

export const CONNECT_DATABASE = (MONGO_CRED) => {
    connect(
        `mongodb+srv://${MONGO_CRED}@cluster0.7qlv4.mongodb.net/graphql-todos`,
    )
        .then(() => {
            console.log("DB Connected :)");
        })
        .catch((err) => {
            console.log(err);
        });
};