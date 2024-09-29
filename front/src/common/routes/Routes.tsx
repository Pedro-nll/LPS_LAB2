import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import App from '../../App';
import { CoursePage } from '../pages/course/CoursePage';
import { CurriculumPage } from '../pages/curriculum/CurriculumPage';
import ErrorPage from '../pages/error/ErrorPage';
import ForgotPassword from "../pages/forgotPassword/ForgotPassword.tsx";
import ChangePassword from "../pages/forgotPassword/change/ChangePassword.tsx";
import Request from "../pages/forgotPassword/request/Request.tsx";
import CheckToken from "../pages/forgotPassword/token/CheckToken.tsx";
import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/login/LoginPage';
import { RegistrationPage } from '../pages/registration/Registration';
import { StudentPage } from '../pages/student/StudentPage';
import { SubjectPage } from '../pages/subjects/SubjectsPage.tsx';
import { TeacherSubjectPage } from '../pages/subjects/TeacherSubjectPage.tsx';
import { TeacherPage } from '../pages/teacher/TeacherPage';
import { DisciplinePage } from '../pages/disciplines/Discipline';

const SystemRoutes = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/home",
          element: <HomePage />,
        },
        {
          path: "/teacherSubject",
          element: <TeacherSubjectPage />,
        },
        {
          path: "/course",
          element: <CoursePage />,
        },
        {
          path: "/curriculum",
          element: <CurriculumPage />,
        },
        {
          path: "/student",
          element: <StudentPage />,
        },
        {
          path: "/teacher",
          element: <TeacherPage />,
        },
        {
            path: "/subjects",
            element: <SubjectPage />,
          },
          {
            path: "/disciplines",
            element: <DisciplinePage />,
          },
  
      ],
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: "/registration",
      element: <RegistrationPage />,
    },
    {
      path: '/forgotpassword',
      element: <ForgotPassword />,
      children: [
        {
          index: true,
          element: <Request />
        },
        {
          path: 'token',
          element: <CheckToken />
        },
        {
          path: 'changepassword',
          element: <ChangePassword />
        }
      ]
    }
  ]);

  export default SystemRoutes;