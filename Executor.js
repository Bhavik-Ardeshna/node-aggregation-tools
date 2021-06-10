class Executor {
    /*
    Create's a Executor class object which takes model and pipleline parameters
    which print and execute the aggregation pipline
    */


    // Initialize the executor which require model[Database] and pipleine array of stages
    constructor(model, pipeline) {
        this.model = model;
        this.pipeline = pipeline;
    }

    print() {
        console.log(JSON.stringify(this.pipeline, null, 4));
        return this;
    }

    async exec() {
        return this.model.aggregate(this.pipeline);
    }
}

module.exports = Executor;


