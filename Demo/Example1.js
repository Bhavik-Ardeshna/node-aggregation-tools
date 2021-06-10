const Aggregator = require('../Aggregator');
const mongoose = require('mongoose');

// Enter your collection name in your database
const collectioName = "";

mongoose.connect("mongodb://localhost:27017/" + collectioName, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// Student model ----> 3 fields
const Student = new mongoose.model("Student", {
    name: String,
    city: String,
    subject: [String]
});

const getStudentList = new Aggregator(Student)
    .match({ city: "Rajkot" })
    .project({ _id: false, name: true, subject: true })
    .unwind({ path: "$subject" })
    .limit(2)
    .build();

async function createStudent(name, city) {
    const temp = new Student({
        name,
        city,
        subject: ["Maths", "Chem", "Physics"]
    });
    await temp.save();
}

async function main() {
    await Promise.all([
        createStudent("Roy", "Rajkot"),
        createStudent("Meet", "Mumbai"),
        createStudent("Jeet", "Goa"),
        createStudent("Mann", "Pune"),
        createStudent("Raj", "Rajkot"),
    ]);

    const aggregateStudent = await getStudentList.print().exec();

    console.log(aggregateStudent);

    process.exit(0);
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});