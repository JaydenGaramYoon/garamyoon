import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
  Chip,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Fab,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import auth from "../lib/auth-helper.js";
import { list, create, update, remove } from "./api-projects.js";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [viewingProject, setViewingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    time: "",
    image: "",
    description: "",
    technologies: "",
    skills: "",
    role: "",
    github: "",
    liveDemo: "",
    problemLog: "",
    testingLog: "",
  });
  // jwt 변수 제거 - 필요할 때마다 동적으로 가져오기

  // 프로젝트 정렬 함수
  const sortProjects = (projectsArray) => {
    return [...projectsArray].sort((a, b) => {
      const parseTime = (timeStr) => {
        if (!timeStr) return { start: new Date(0), isPresent: false };
        
        // "2025-05-01 ~ PRESENT" 또는 "2025-05-01 ~ 2025-12-31" 형식
        const parts = timeStr.split('~').map(p => p.trim());
        const startDate = new Date(parts[0]);
        const isPresent = parts[1]?.toUpperCase() === 'PRESENT';
        const endDate = isPresent ? new Date() : new Date(parts[1] || parts[0]);
        
        return { start: startDate, end: endDate, isPresent };
      };
      
      const aTime = parseTime(a.time);
      const bTime = parseTime(b.time);
      
      // PRESENT 프로젝트끼리는 시작일 최신순
      if (aTime.isPresent && bTime.isPresent) {
        return bTime.start - aTime.start;
      }
      
      // PRESENT 프로젝트가 먼저
      if (aTime.isPresent) return -1;
      if (bTime.isPresent) return 1;
      
      // 완료된 프로젝트는 종료일 최신순
      return bTime.end - aTime.end;
    });
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal).then((data) => {
      if (data && !data.error) {
        setProjects(sortProjects(data));
      }
    });

    return () => abortController.abort();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProjectForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const currentJwt = auth.isAuthenticated() || {}; // 최신 JWT 토큰 가져오기 (가드)
    const token = currentJwt.token;

    // 필수 필드 검증
    if (!projectForm.title.trim()) {
      alert("Project title is required");
      return;
    }
    if (!projectForm.image.trim()) {
      alert("Project image URL is required");
      return;
    }
    // 이미지 URL 형식 검증 (http, https, 또는 /로 시작하는 경로 허용)
    if (
      !projectForm.image.startsWith("http://") &&
      !projectForm.image.startsWith("https://") &&
      !projectForm.image.startsWith("/")
    ) {
      console.log("Invalid image URL:", projectForm.image); // 디버그 로그 추가
      alert(
        "Please provide a valid image URL (starting with http://, https://, or / for public folder images)"
      );
      return;
    }
    if (!projectForm.description.trim()) {
      alert("Project description is required");
      return;
    }
    if (!projectForm.role.trim()) {
      alert("Your role is required");
      return;
    }
    if (!projectForm.time.trim()) {
      alert("Project time period is required");
      return;
    }

    const projectData = {
      title: projectForm.title.trim(),
      time: projectForm.time.trim(),
      image: projectForm.image.trim(),
      description: projectForm.description.trim(),
      technologies: projectForm.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech.length > 0),
      skills: projectForm.skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
      role: projectForm.role.trim(),
      problemLog: projectForm.problemLog.trim(),
      testingLog: projectForm.testingLog.trim(),
    };

    // URL 필드가 비어있지 않고 유효한 경우에만 추가
    if (
      projectForm.github &&
      projectForm.github.trim() &&
      projectForm.github.trim() !== ""
    ) {
      const githubUrl = projectForm.github.trim();
      if (githubUrl.startsWith("http://") || githubUrl.startsWith("https://")) {
        projectData.github = githubUrl;
      } else {
        alert("Please provide a valid GitHub URL (starting with http:// or https://)");
        return;
      }
    }

    if (
      projectForm.liveDemo &&
      projectForm.liveDemo.trim() &&
      projectForm.liveDemo.trim() !== ""
    ) {
      const liveDemoUrl = projectForm.liveDemo.trim();
      if (liveDemoUrl.startsWith("http://") || liveDemoUrl.startsWith("https://")) {
        projectData.liveDemo = liveDemoUrl;
      } else {
        alert("Please provide a valid Live Demo URL (starting with http:// or https://)");
        return;
      }
    }

    console.log("Sending project data:", projectData); // 디버그 로그

    if (editingProject) {
      update({ projectId: editingProject }, { t: token }, projectData).then((data) => {
        if (data && !data.error) {
          const updatedProjects = projects.map((p) => (p._id === editingProject ? data : p));
          setProjects(sortProjects(updatedProjects));
          handleClose();
        } else {
          console.error("Update error:", data);
          alert("Failed to update project: " + (data.error || "Unknown error"));
        }
      });
    } else {
      console.log("Creating project with JWT:", currentJwt); // 디버그 로그 추가
      create({ t: token }, projectData).then((data) => {
        if (data && !data.error) {
          list().then((updatedData) => {
            if (updatedData && !updatedData.error) {
              setProjects(sortProjects(updatedData));
            }
          });
          handleClose();
        } else {
          console.error("Create error:", data);
          alert("Failed to create project: " + (data.error || "Unknown error"));
        }
      });
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project._id);
    setProjectForm({
      title: project.title,
      time: project.time,
      image: project.image,
      description: project.description,
      technologies: (project.technologies || []).join(", "),
      skills: (project.skills || []).join(", "),
      role: project.role,
      github: project.github || "",
      liveDemo: project.liveDemo || "",
      problemLog: project.problemLog || "",
      testingLog: project.testingLog || "",
    });
    setOpen(true);
  };

  const handleDelete = (projectId) => {
    const currentJwt = auth.isAuthenticated() || {};
    const token = currentJwt.token;
    remove({ projectId }, { t: token }).then((data) => {
      if (data && !data.error) {
        setProjects(projects.filter((p) => p._id !== projectId));
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProject(null);
    setViewingProject(null);
    setProjectForm({
      title: "",
      time: "",
      image: "",
      description: "",
      technologies: "",
      skills: "",
      role: "",
      github: "",
      liveDemo: "",
      problemLog: "",
      testingLog: "",
    });
  };

  const handleCardClick = (project) => {
    setViewingProject(project);
  };

  return (
    <Box>
      <Typography variant="h3" gutterBottom sx={{
                          fontWeight: 800,
                          color: "#3eb93e",
                          letterSpacing: -0.3,
                          mt: 4,
                          mb: 4,
                          textAlign: "center",
                        }}>
        Works
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {projects.map((project) => (
          <Grid item xs={12} md={6} lg={4} key={project._id} sx={{ display: "flex" }}>
            <Card 
              sx={{ 
                width: "100%", 
                maxWidth: 450, 
                display: "flex", 
                flexDirection: "column", 
                margin: '0 auto',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                }
              }}
              onClick={() => handleCardClick(project)}
            >
              <CardMedia
                component="img"
                height="200"
                image={project.image}
                alt={project.title}
              />
              <CardContent sx={{ flexGrow: 1, p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {project.title}
                </Typography>
                {(project.time ?? '').trim() !== '' && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontStyle: 'italic' }}>
                    {project.time}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                  {project.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>Role:</strong> {project.role}
                </Typography>
                {(project.technologies || []).length > 0 && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>Technologies:</strong> {project.technologies.join(', ')}
                  </Typography>
                )}
                {Array.isArray(project.skills) && project.skills.length > 0 && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    <strong>Skills:</strong> {project.skills.join(', ')}
                  </Typography>
                )}
                <Box sx={{ display: "flex", gap: 1, flexWrap: 'wrap', mt: 'auto' }}>
                  {project.github && project.github.trim() !== "" && (
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<GitHubIcon />}
                      href={project.github}
                      target="_blank"
                      sx={{
                        textTransform: "none",
                        borderColor: "#3eb93e",
                        color: "#3eb93e",
                        ":hover": { borderColor: "#2a8a2a", color: "#2a8a2a" },
                      }}
                    >
                      GitHub
                    </Button>
                  )}
                  {project.liveDemo && project.liveDemo.trim() !== "" && (
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<LaunchIcon />}
                      href={project.liveDemo}
                      target="_blank"
                      sx={{
                        textTransform: "none",
                        borderColor: "#3eb93e",
                        color: "#3eb93e",
                        ":hover": { borderColor: "#2a8a2a", color: "#2a8a2a" },
                      }}
                    >
                      Live Demo
                    </Button>
                  )}
                  {project.problemLog && project.problemLog.trim() !== "" && (
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<LaunchIcon />}
                      href={project.problemLog}
                      target="_blank"
                      sx={{
                        textTransform: "none",
                        borderColor: "#3eb93e",
                        color: "#3eb93e",
                        ":hover": { borderColor: "#2a8a2a", color: "#2a8a2a" },
                      }}
                    >
                      Dev Log
                    </Button>
                  )}
                  {project.testingLog && project.testingLog.trim() !== "" && (
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<LaunchIcon />}
                      href={project.testingLog}
                      target="_blank"
                      sx={{
                        textTransform: "none",
                        borderColor: "#3eb93e",
                        color: "#3eb93e",
                        ":hover": { borderColor: "#2a8a2a", color: "#2a8a2a" },
                      }}
                    >
                      Test Report
                    </Button>
                  )}
                </Box>

                {auth.isAuthenticated() && auth.isAuthenticated().user && auth.isAuthenticated().user.admin && (
                  <Box sx={{ mt: 2, display: "flex", gap: 1, alignSelf: 'flex-start' }}>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(project);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(project._id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {projects.length === 0 && (
        <Typography
          variant="h6"
          color="text.secondary"
          align="center"
          sx={{ mt: 4 }}
        >
          Loading projects...
        </Typography>
      )}

      {auth.isAuthenticated() && auth.isAuthenticated().user && auth.isAuthenticated().user.admin && (
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          onClick={() => setOpen(true)}
        >
          <AddIcon />
        </Fab>
      )}

      {/* Project Detail Modal */}
      {viewingProject && (
        <Dialog 
          open={!!viewingProject} 
          onClose={handleClose} 
          maxWidth="md" 
          fullWidth
          sx={{
            '& .MuiDialog-paper': {
              maxHeight: '90vh',
            }
          }}
        >
          <DialogTitle component="div" sx={{ pb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {viewingProject.title}
            </Typography>
            {viewingProject.time && (
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mt: 0.5 }}>
                {viewingProject.time}
              </Typography>
            )}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mb: 3 }}>
              <CardMedia
                component="img"
                image={viewingProject.image}
                alt={viewingProject.title}
                sx={{ 
                  borderRadius: 1,
                  maxHeight: 400,
                  objectFit: 'cover',
                  width: '100%'
                }}
              />
            </Box>
            
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Description
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {viewingProject.description}
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Role
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {viewingProject.role}
            </Typography>

            {viewingProject.technologies && viewingProject.technologies.length > 0 && (
              <>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Technologies
                </Typography>
                <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {viewingProject.technologies.map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech}
                      size="medium"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </>
            )}

            {viewingProject.skills && viewingProject.skills.length > 0 && (
              <>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Skills
                </Typography>
                <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {viewingProject.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      size="medium"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </>
            )}

            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mt: 3 }}>
              {viewingProject.github && viewingProject.github.trim() !== "" && (
                <Button
                  variant="outlined"
                  startIcon={<GitHubIcon />}
                  href={viewingProject.github}
                  target="_blank"
                  sx={{
                    textTransform: "none",
                    borderColor: "#3eb93e",
                    color: "#3eb93e",
                    ":hover": { borderColor: "#2a8a2a", color: "#2a8a2a" },
                  }}
                >
                  GitHub
                </Button>
              )}
              {viewingProject.liveDemo && viewingProject.liveDemo.trim() !== "" && (
                <Button
                  variant="outlined"
                  startIcon={<LaunchIcon />}
                  href={viewingProject.liveDemo}
                  target="_blank"
                  sx={{
                    textTransform: "none",
                    borderColor: "#3eb93e",
                    color: "#3eb93e",
                    ":hover": { borderColor: "#2a8a2a", color: "#2a8a2a" },
                  }}
                >
                  Live Demo
                </Button>
              )}
              {viewingProject.problemLog && viewingProject.problemLog.trim() !== "" && (
                <Button
                  variant="outlined"
                  startIcon={<LaunchIcon />}
                  href={viewingProject.problemLog}
                  target="_blank"
                  sx={{
                    textTransform: "none",
                    borderColor: "#3eb93e",
                    color: "#3eb93e",
                    ":hover": { borderColor: "#2a8a2a", color: "#2a8a2a" },
                  }}
                >
                  Dev Log
                </Button>
              )}
              {viewingProject.testingLog && viewingProject.testingLog.trim() !== "" && (
                <Button
                  variant="outlined"
                  startIcon={<LaunchIcon />}
                  href={viewingProject.testingLog}
                  target="_blank"
                  sx={{
                    textTransform: "none",
                    borderColor: "#3eb93e",
                    color: "#3eb93e",
                    ":hover": { borderColor: "#2a8a2a", color: "#2a8a2a" },
                  }}
                >
                  Test Report
                </Button>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Admin Edit/Add Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingProject ? "Edit Project" : "Add New Project"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Project Title"
            fullWidth
            variant="outlined"
            required
            value={projectForm.title}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="image"
            label="Image URL"
            fullWidth
            variant="outlined"
            required
            value={projectForm.image}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="time"
            label="Time Period (e.g., 2025-05-01 ~ PRESENT)"
            fullWidth
            variant="outlined"
            required
            value={projectForm.time}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            required
            value={projectForm.description}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="technologies"
            label="Technologies (comma separated)"
            fullWidth
            variant="outlined"
            value={projectForm.technologies}
            onChange={handleFormChange}
            helperText="e.g., React, Node.js, MongoDB"
          />
          <TextField
            margin="dense"
            name="skills"
            label="Skills (comma separated)"
            fullWidth
            variant="outlined"
            value={projectForm.skills}
            onChange={handleFormChange}
            helperText="e.g., QA, E2E Testing, JUnit"
          />
          <TextField
            margin="dense"
            name="role"
            label="Your Role"
            fullWidth
            variant="outlined"
            required
            value={projectForm.role}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="github"
            label="GitHub URL"
            fullWidth
            variant="outlined"
            value={projectForm.github}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="liveDemo"
            label="Live Demo URL"
            fullWidth
            variant="outlined"
            value={projectForm.liveDemo}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="problemLog"
            label="Dev Log URL"
            fullWidth
            variant="outlined"
            value={projectForm.problemLog}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="testingLog"
            label="Testing Log URL"
            fullWidth
            variant="outlined"
            value={projectForm.testingLog}
            onChange={handleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingProject ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Projects;
