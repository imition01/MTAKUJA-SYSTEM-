//storage
let students = []; 

//registring
const form = document.getElementById("studentform");
const tableBody = document.getElementById("studenttable");
const searchInput = document.getElementById("searchInput");

    form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const id = document.getElementById("studentId").value.trim();
    const gender = document.getElementById("gender").value;
    const age = document.getElementById("age").value;
    const formLevel = document.getElementById("formLevel").value;

//validation by const names
    if(!name || !id || !gender || !age || !formLevel)
        {
            alert("Please fill all fields");
            return;
        }
        
//making sure of unique ID
    const exists = students.some(student => student.id === id);
    
    if(exists)
    {
        alert("student ID already exists!");
        return;
    }

    const student = {
                        id:id,
                        name:name,
                        age:parseInt(age),
                        gender:gender,
                        form:parseInt(formLevel),
                        performance:[] 
                    };
                    
    students.push(student);
    displayStudents();
    form.reset();                
});

//displaying students
function displayStudents(list = students)
{
    
    tableBody.innerHTML="";

    list.forEach(student => { const average = calculateAverage(student);

    tableBody.innerHTML +=`
    
    <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>Form ${student.form}</td>
        <td>${average}</td>
        <td>
            <button onclick="addPerformancePrompt('${student.id}')">Add Results</button>
            <button onclick="promoteStudent('${student.id}')">Promote</button>
            <button onclick="deleteStudent('${student.id}')">Delete</button>
        </td>
    </tr>

     `;
});
}

//deleting students
function deleteStudent(id)
{
    students = students.filter(student => student.id !== id);
    displayStudents();
}

//promoting student
function promoteStudent(id)
{
    const student = students.find(s =>s.id === id);

    if(student.form < 4)
    {
        student.form++;
        alert(student.name + "promoted to form" + student.form);
    } 
    else
    {
        alert("student already in form 4");
    }

    displayStudents();
}

//adding perfomance
function addPerformancePrompt(id)
{
    const student = students.find(s => s.id === id);
    if (!student) {
        alert("student not found");
        return;
    }

    const math = parseInt(prompt("Enter mathematics marks"));
    const english = parseInt(prompt("Enter english marks"));
    const science = parseInt(prompt("Enter science marks"));
    const social = parseInt(prompt("Enter social marks"));

    if(isNaN(math) ||isNaN(english) ||isNaN(science) ||isNaN(social))
    {
        alert("invalid marks entered.");
        return;
    }

    const record = {
                         form: student.form,
                         subjects: {
                                    math: math,
                                    english: english,
                                    science: science,
                                    social: social
                                  }
                   };
    const existing = student.performance.find(p=>p.form === student.form);
    
    if(existing)
        {
            existing.subjects = record.subjects;
        }
        else
        {
            student.performance.push(record);
        }   

    displayStudents();                
}

//calculating average
function calculateAverage(student)
{
    if (student.performance.length === 0) return 0;

    let total = 0;
    let count = 0;

    student.performance.forEach(record => {
                                            const subjects = record.subjects;

                                            total += subjects.math + subjects.english + subjects.science + subjects.social;
                                            count += 4;
                                          });
    return(total / count).toFixed(2);                                      
}

function searchStudent()
{
    const keyword = searchInput.value.trim().toLowerCase();
    if (!keyword) {
        displayStudents();
        return;
    }

    const filtered = students.filter(student => student.name.toLowerCase().includes(keyword) || student.id.toLowerCase().includes(keyword));

    displayStudents(filtered);
}
