import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
    } catch (error) {
        console.log('Collections were not present, skipping drop');
    }

    const john = new User({
        email: "john@example.com",
        displayName: "John",
        password: "123",
        confirmPassword: "123",
        role: "user",
        avatar: "fixtures/unknown.jpeg",
    });

    john.generateToken();
    await john.save();

    const jane = new User({
        email: "jane@example.com",
        displayName: "Jane",
        password: "123",
        confirmPassword: "123",
        role: "admin",
        avatar: "fixtures/unknown.jpeg",
    });

    jane.generateToken();
    await jane.save();

    await db.close();
};

run().catch(console.error);