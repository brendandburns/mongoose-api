# mongoose-api

This is a work in progress to build a simple RESTful API frontend on top of the Mongoose.js library.

Usage:

```sh
node mongoose-api.js <mongo-hostname> <resource-name> <resource-schema> 
```

For example

```sh
node mongoose-api.js my-mongo dogs '{"name": "String", "age": "Number"}'
```
