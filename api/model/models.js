import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const IssueSchema = new Schema({  
  issue_title: {
    type: String, 
    required: true},
  // creator_id: {
  //   type: mongoose.Types.ObjectId, 
  //   required: true},
  issue_description: {
    type: String, 
    required: true},
  // updates: {
  //   type: [IssueUpdateSchema], 
  //   required: true},
  //date_created: {type: Date, required: true},
  //assigned_user: {type: mongoose.Types.ObjectId, required: true},
  //status: {type: String, required: true},
  //date_resolved: {type: Date},
  //priority: {type: String}

});

const IssueUpdateSchema = new Schema({
  update: {
    type: String, 
    required: true },
  //date_created: {type: Date, required: true},
  //creator_id: {type: mongoose.Types.ObjectId, required: true}
});


const ProjectSummarySchema = new Schema({
  project_id: {
    type: mongoose.Types.ObjectId, 
    required: true},
  project_title: {
    type: String, 
    required: true, 
    default: "untitled"}
})


const ProjectSchema = new Schema({
  project_title: {
    type: String, 
    required: true, 
    default: "Untitled"},
  project_description: {
    type: String,
    required: true,
    default: "No description"},
  owner: {
    type: mongoose.Types.ObjectId },
  participants: {
    type: [mongoose.Types.ObjectId]},
  issue_list: {
    type: [IssueSchema]}

});


const UserSchema = new Schema({
  username: {
    type: String, 
    required: true},
  password: {
    type: String, 
    required: true},
  projects_owner: {
    type: [ProjectSummarySchema]},
  projects_participant: {
    type: [ProjectSummarySchema]},

});



const Project = model("Project", ProjectSchema);
const ProjectSummary = model("ProjectSummary", ProjectSummarySchema);
const Issue = model("Issue", IssueSchema);
const User = model("User" , UserSchema);
const IssueUpdate = model("IssueUpdate", IssueUpdateSchema);

export {
  Project,
  ProjectSummary,
  Issue,
  IssueUpdate,
  User

}

