<div style="text-align: center; width: 100%;">

# `node-aggregation-tools`

</div>

<a id="doc-link" style="display: block; cursor: pointer;" href="https://mikedev75015.github.io/mongodb-pipeline-builder" target="_blank">Technical documentation</a>

<p style="text-align: justify; width: 100%;font-size: 15px;">
is a pipeline builder for the db.collection.aggregate method and db.aggregate method. It will simplify pipelines by making them more
readable and much easier to edit. It also allows you to test your pipelines on a dataset in order to verify them. Pipeline stages appear in an array. Documents pass
through the stages in sequence.
</p>

## npm package <img src="https://pbs.twimg.com/media/EDoWJbUXYAArclg.png" width="24" height="24" />

### `npm i node-aggregation-tools`

## Usage:


### - with require

```typescript
const aggregator = require("node-aggregation-tools");
```

### - with import


```typescript
import { Aggregator } from 'node-aggregation-tools';

```

## Example with Student model:


```typescript
const Student = new mongoose.model("Student", {
    name: String,
    city: String,
    subject: [String]
});
```

## Example of pipline:


```typescript
const getStudentList = new Aggregator(Student)
    .match({ city: "Rajkot" })
    .project({ _id: false, name: true, subject: true })
    .unwind({ path: "$subject" })
    .limit(2)
    .build();
    
const aggregateStudent = await getStudentList.print().exec();
```

___


### [ <a href="https://npm.runkit.com/node-aggregation-tools" target="_blank">Try the lib on NPM RunKit with the require method</a> ]<br>


<p style="font-size: 14px; white-space: nowrap;">[ <a href="https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/" target="_blank">Aggregation Pipeline Stages</a> ]</p>

## `MONGODB STAGES:`
<p style="font-size: 15px;">
AddFields | Bucket | BucketAuto | CollStats | Count | Facet | GeoNear | GraphLookup | Group | IndexStats | Limit | Lookup | Match | Out | Project | ReplaceWith | Sample | Search | Set | Skip | Sort | SortByCount | Unset | Unwind
</p>

___

<p style="font-size: 14px; white-space: nowrap;">[ <a href="https://docs.mongodb.com/manual/reference/operator/aggregation/" target="_blank">Aggregation Pipeline Operators</a> ]</p>

<p style="font-size: 15px;">
Absolute | Accumulator | Acos | Acosh | Add | AddToSet | AllElementsTrue | And | AnyElementTrue | ArrayElemAt | ArrayToObject | Asin | Asinh | Atan | Atan2 | Atanh | Avg | BinarySize | BsonSize | Ceil | Compare | Concat | ConcatArrays | Cond | Convert | Cos | Cosh | DateFromParts | DateFromString | DateToParts | DateToString | DayOfMonth | DayOfWeek | DayOfYear | DegreesToRadians | Divide | Equal | Exponent | Expression | Filter | First | Floor | FunctionOperator | GreaterThan | GreaterThanEqual | Hour | IfNull | In | IndexOfArray | IndexOfBytes | IndexOfCP | IsArray | IsNumber | IsoDayOfWeek | IsoWeek | IsoWeekYear | Last | LessThan | LessThanEqual | Let | Literal | Log | Log10 | Ltrim | MapOperator | Max | MergeObjects | Meta | Millisecond | Min | Minute | Mod | Month | Multiply | NaturalLog | Not | NotEqual | ObjectToArray | Or | Pow | Push | RadiansToDegrees | Rand | Range | Reduce | RegexFind | RegexFindAll | RegexMatch | ReplaceAll | ReplaceOne | ReverseArray | Round | Rtrim | SampleRate | Second | SetDifference | SetEquals | SetIntersection | SetIsSubset | SetUnion | Sin | Sinh | Size | Slice | Split | Sqrt | StdDevPop | StdDevSamp | StrCaseCmp | StrLenBytes | StrLenCP | Substr | SubstrBytes | SubstrCP | Subtract | Sum | Switch | Tan | Tanh | ToBool | ToDate | ToDecimal | ToDouble | ToInt | ToLong | ToLower | ToObjectId | ToString | ToUpper | Trim | Trunc | Type | Week | Year | Zip
</p>
<br><br><br><br>
