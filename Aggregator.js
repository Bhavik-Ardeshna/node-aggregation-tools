const Executor = require('./Executor');

class Aggregator {

    constructor(model, { skipModelCheck = false } = {}) {

        if (typeof model.aggregate !== "function" && !skipModelCheck) {
            throw new Error("Model is not a mongoose model");
        }
        this.model = model;
        this.pipeline = [];
    }

    _checkParams(params, reqParams, stageName) {
        /*
        Mainly check that stage name is present in provided object
        */

        // check params is of type object
        if (typeof params !== "object")
            throw new Error(`Parameter must be an object in stage ${stageName}`)

        for (var reqParam of reqParams) {
            if (params[reqParam] === undefined || params[reqParam] === null) {
                throw new Error(
                    `Field ${requiredField} is required in stage ${stageName}`
                );
            }
        }
    }

    _omitNulls(params) {
        const checkedParams = {};
        for (const paramName of Object.key(params)) {
            if (![NaN, undefined, null, ""].includes(params[paramName]){
                checkedParams[paramName] = params[paramName];
            }
        }
        return checkedParams;
    }

    match(filter) {
        this._checkParams({ filter }, ["filter"], "match")

        this.pipeline.push({
            $match: this._omitNulls({
                ...filter
            })
        });
        return this;
    }

    project(projection) {
        this._checkParams({ projection }, ["projection"], "project")

        this.pipeline.push({
            $project: this._omitNulls({
                ...projection
            })
        });
        return this;
    }

    limit(count) {
        this._checkParams({ count }, ["count"], "limit");

        this.pipeline.push({
            $limit: count
        });
        return this;
    }

    sort(sort) {
        this._checkParams({ sort }, ["sort"], "sort");

        this.pipeline.push({
            $sort: this._omitNulls({
                ...sort
            })
        });
        return this;
    }

    limit(count) {
        this._checkParams({ count }, ["count"], "limit");

        this.pipeline.push({
            $limit: count
        });
        return this;
    }

    unwind({ path, includeArrayIndex, preserveNullAndEmptyArrays }) {
        //includeArrayIndex and preserveNullAndEmptyArrays are optional read docs
        this._checkParams(
            { path, includeArrayIndex, preserveNullAndEmptyArrays },
            ["path"],
            "unwind"
        );

        this.pipeline.push({
            $unwind: this._omitNulls({
                path,
                includeArrayIndex,
                preserveNullAndEmptyArrays
            })
        });
        return this;
    }

    build() {
        return new Executor(this.model, this.pipeline);
    }

    async buildAndExec() {
        return await this.build().exec();
    }
}


module.exports = Aggregator;
