const FormConfig = {
  name: {
    label: "Name",
    type: "text",
  },
  email: {
    label: "Email",
    type: "email",
  },
  phone: {
    label: "Phone Number",
    type: "phone",
  },

  // Experience
  company: {
    label: "Company Name",
    type: "text",
  },
  role: {
    label: "Role",
    type: "text",
  },
  start_date: {
    label: "Start Date",
    type: "date",
  },
  end_date: {
    label: "End Date (or expected)",
    type: "date",
  },
  experience_description: {
    label: "Description",
    type: "textarea",
  },

  // Education
  education: {
    title: {
      label: "University",
      type: "text",
    },
    degree: {
      label: "Degree",
      type: "text",
    },
    field_of_study: {
      label: "Field of Study",
      type: "text",
    },
    start_date_education: {
      label: "Start Date",
      type: "date",
    },
    end_date_education: {
      label: "End Date",
      type: "date",
    },
    grade: {
      label: "Grade",
      type: "text",
    },
    education_desc: {
      label: "Description",
      type: "textarea",
    },
  },

  // Achievements
  achievement: {
    title: {
      label: "Title",
      type: "text",
    },
    description: {
      label: "Description",
      type: "textarea",
    },
  },
};

export default FormConfig;
