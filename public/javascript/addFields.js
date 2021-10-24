const educationAddButton = document.querySelector("#edu-add-button");
const educationSection = document.querySelector("#education")
const projectAddButton = document.querySelector("#project-add-button")
const projectSection = document.querySelector("#projects");
const trainingAddButton = document.querySelector("#training-add-button")
const trainingSection = document.querySelector("#trainings");
const webLinkAddButton = document.querySelector("#web-link-add-button")
const webLinkSection = document.querySelector("#web-links");

let eduCount = 0,
    projectCount = 0,
    trainingCount = 0,
    linkCount = 0;

document.onload = function(){
    const educationFields = document.querySelectorAll(".educationfield");
    const projectFields = document.querySelectorAll(".projectField");
    const trainingFields = document.querySelectorAll(".trainingField");
    const linkFields = document.querySelectorAll(".linkField");
    
    if(educationFields){
        eduCount = educationFields.length;
    }
    if(projectFields){
        projectCount = projectFields.length;
    }
    if(trainingFields){
        trainingCount = trainingFields.length;
    }
    if(linkFields){
        linkCount = linkFields.length;
    }
}

educationAddButton.addEventListener("click", () => {
    let newField = document.createElement("div");
    newField.innerHTML = `  <div class="card p-2 mb-2 educationField">
                                <div class="mb-3">
                                    <label class="form-label" for="edu-course">Course</label>
                                    <input class="form-control" type="text" name="education[` + eduCount + `][course]" id="edu-course"
                                        required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label" for="edu-institute">Institute</label>
                                    <input class="form-control" type="text" name="education[` + eduCount + `][institute]" id="edu-institute"
                                        required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label" for="edu-duration">Duration</label>
                                    <input class="form-control" type="text" name="education[` + eduCount + `][duration]" id="edu-duration" placeholder="Start date - End date"
                                        required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label" for="edu-percentage">Percentage</label>
                                    <input class="form-control" type="text" name="education[` + eduCount + `][percentage]" id="edu-percentage"
                                        required>
                                </div>
                                <div class="mg-3 mx-1">
                                    <button type="button" class="btn btn-danger" id="edu-delete-button` + eduCount + `">Delete</button>
                                </div>
                            </div>`
    educationSection.insertBefore(newField, educationAddButton.parentNode);
    document.getElementById("edu-delete-button" + eduCount++).addEventListener("click", () => {
        educationSection.removeChild(newField)
    })

})

projectAddButton.addEventListener("click", () => {
    let newField = document.createElement("div");
    newField.innerHTML = `  <div class="card p-2 mb-2 projectField">
                                <div class="mb-3">
                                    <label class="form-label" for="project-title">Title</label>
                                    <input class="form-control" type="text" name="project[` + projectCount + `][title]" id="project-title"
                                        required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label" for="project-key-skills">Key Skills</label>
                                    <input class="form-control" type="text" name="project[` + projectCount + `][skills]" id="project-key-skills"
                                        required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label" for="project-duration">Duration</label>
                                    <input class="form-control" type="text" name="project[` + projectCount + `][duration]" id="project-duration" placeholder="Start date - End date"
                                        required>
                                </div>
                                <div class="mb-3">
                                    <label for="project-description" class="form-label">Description</label>
                                    <textarea class="form-control" name="project[` + projectCount + `][description]" id="project-description" rows="3"></textarea>
                                </div>
                                <div class="mg-3 mx-1">
                                    <button type="button" class="btn btn-danger" id="project-delete-button` + projectCount + `">Delete</button>
                                </div>
                            </div>`;
    projectSection.insertBefore(newField, projectAddButton.parentNode);
    document.getElementById("project-delete-button" + projectCount++).addEventListener("click", () => {
    projectSection.removeChild(newField)
})
})

trainingAddButton.addEventListener("click", () => {
    let newField = document.createElement("div");
    newField.innerHTML = `  <div class="card p-2 mb-2 trainingfield">
                                <div class="mb-3">
                                    <label class="form-label" for="training-course">Course</label>
                                    <input class="form-control" type="text" name="training[` + trainingCount + `][course]" id="training-course"
                                        required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label" for="training-institute">Institute</label>
                                    <input class="form-control" type="text" name="training[` + trainingCount + `][institute]" id="training-institute"
                                        required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label" for="training-key-skills">Key skills</label>
                                    <input class="form-control" type="text" name="training[` + trainingCount + `][skills]" id="training-key-skills"
                                        required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label" for="training-duration">Duration</label>
                                    <input class="form-control" type="text" name="training[` + trainingCount + `][duration]" id="training-duration" placeholder="Start date - End date"
                                        required>
                                </div>   
                                <div class="mg-3 mx-1">
                                    <button type="button" class="btn btn-danger" id="training-delete-button` + trainingCount + `">Delete</button>
                                </div>
                            </div>`;
    trainingSection.insertBefore(newField, trainingAddButton.parentNode);
    document.getElementById("training-delete-button" + trainingCount++).addEventListener("click", () => {
    trainingSection.removeChild(newField)
})
})

webLinkAddButton.addEventListener("click", () => {
    let newField = document.createElement("div");
    newField.innerHTML = `  <div class="row mb-3 linkField">
                                <div class="col-md-3">                                   
                                    <input class="form-control" type="text" name="link[` + linkCount + `][title]" id="web-link-title" placeholder="name" required>
                                </div>
                                <div class="col-md-8">
                                    <input class="form-control" type="text" name="link[` + linkCount + `][url]" id="web-link-url" placeholder="url" required>
                                </div>
                                <div class="col-md-1">
                                    <div class="mg-3 mx-1 mt-1">
                                        <button type="button" class="btn btn-danger btn-sm" id="link-delete-button` + linkCount + `">X</button>
                                    </div>
                                </div>
                            </div>`
    webLinkSection.insertBefore(newField, webLinkAddButton.parentNode);
    document.getElementById("link-delete-button" + linkCount++).addEventListener("click", () => {
        webLinkSection.removeChild(newField)
    })

})