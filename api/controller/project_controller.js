import { Project, User, ProjectSummary, Issue} from '../model/models.js';


// route: router.get('/:project_id', projectController.getProjectById);
const getProjectById = (req, res) => {
  const project_id = req.params.project_id;
    Project.findById(project_id)
      .then(result => {
        // no project that matches id found
        if(result === null){
          let response = {"message":"project not found"};
          res.status(404).send(response);
        }
        else {
          res.status(200).send(result);
        };
      })
      .catch(err => {res.status(400)
        .send(err);
      });
}

//router.post('/create_project/:user_id', projectController.createProject);
const createProject = async (req, res) => {
  const project_title = req.body.project_title;
  const project_description = req.body.project_description;
  const owner = req.params.user_id;
 
  let newProject = new Project({
    project_title: project_title,
    project_description: project_description,
    owner: owner
  });
  let projectInfo = await newProject.save();
  let newProjectSummary = new ProjectSummary({
    project_id: projectInfo._id,
    project_title: projectInfo.project_title
  });

  let user = await User.findById(owner);
  user.projects_owner.push(newProjectSummary);
  await user.save();
  res.status(200).send(newProject);

};

//router.post('/add_issue/:project_id', projectController.addIssue);
const addIssue = async (req, res) => {
  const projectId = req.params.project_id;
  const newIssue = new Issue({
    issue_title: req.body.issue_title,
    issue_description: req.body.issue_description,
    //issue_status: req.body.issue_status,
    //issue_priority: req.body.issue_priority,
    //issue_creator: req.body.issue_creator,
    //issue_assignee: req.body.issue_assignee,
    //issue_created_date: req.body.issue_created_date,
    //issue_due_date: req.body.issue_due_date,
    //issue_completed_date: req.body.issue_completed_date
  });

  let project = await Project.findById(projectId);
  project.issue_list.push(newIssue);
  await project.save();
  res.status(200).send(newIssue);

};
  
  

export default {
  getProjectById,
  createProject,
  addIssue
}