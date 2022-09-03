import axios from 'axios';

const URL = 'https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/';
const query = '?filterByFormula=';
const KEY = process.env.REACT_APP_AIRTABLE_API_KEY;

const getClasses = async (studentName) => {
    const name = studentName.charAt(0).toUpperCase() + studentName.slice(1);
    const link = `${URL}Classes${query}SEARCH('${name}, ', CONCATENATE(Students, ", "))`;
    const response = await axios.get(link, {
        headers: { Authorization: `Bearer ${KEY}` }
    });
    const studentIds = new Set();
    response.data.records?.forEach(({fields}) => {
        fields.Students.forEach(studentId => {
            if (!studentIds.has(studentId)) studentIds.add(studentId);
        });
    });
    const linkStudents = `${URL}Students${query}OR(${[...studentIds].map(id => `RECORD_ID()='${id}'`).join(",")})`;
    const studentResponse = await axios.get(linkStudents, {
        headers: { Authorization: `Bearer ${KEY}` }
    });
    const data = [];
    response.data.records?.forEach(({fields}) => {
        const classObj = {};
        classObj.Name = fields.Name;
        const students = [];
        fields.Students.forEach(studentId => {
            const student = studentResponse.data.records?.find(({ id }) => id === studentId);
            students.push(student.fields?.Name);
        });
        classObj.Students = students.join(', ');
        data.push(classObj);
    });
    return data;
};

export default getClasses;