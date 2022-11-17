import { Project, User, ProjectSummary} from '../model/models.js';


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
  
  
  




export default {
  getProjectById,
  createProject
}