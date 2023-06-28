from .database import Base
from sqlalchemy import Column, String, text, DateTime, ARRAY, Integer, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship


class Student(Base):
    __tablename__ = 'students'
    id = Column(UUID, server_default=text("uuid_generate_v4()"), primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email_address = Column(String, nullable=False)
    phone_number = Column(String, nullable=True)
    is_student_opted_placement = Column(Boolean, nullable=False)
    created_at = Column(DateTime, server_default=text("now()"))

    courses = relationship("Course", secondary="student_course_enrollment", back_populates="students")


class Course(Base):
    __tablename__ = 'courses'
    id = Column(UUID, server_default=text("uuid_generate_v4()"), primary_key=True, index=True)
    course_name = Column(String, nullable=False)
    course_code = Column(String, nullable=False)
    course_description = Column(String, nullable=False)
    professor_name = Column(String, nullable=False)
    course_start_date = Column(DateTime, nullable=False)
    course_end_date = Column(DateTime, nullable=False)
    created_at = Column(DateTime, server_default=text("now()"))

    students = relationship("Student", secondary="student_course_enrollment", back_populates="courses")
    course_modules = relationship("CourseModule", back_populates="course")


class StudentCourseEnrollment(Base):
    __tablename__ = 'student_course_enrollment'
    id = Column(UUID, server_default=text("uuid_generate_v4()"), primary_key=True, index=True)
    student_id = Column(UUID, ForeignKey('students.id'))
    course_id = Column(UUID, ForeignKey('courses.id'))
    created_at = Column(DateTime, server_default=text("now()"))


class CourseModule(Base):
    __tablename__ = 'course_modules'
    id = Column(UUID, server_default=text("uuid_generate_v4()"), primary_key=True, index=True)
    course_id = Column(UUID, ForeignKey('courses.id'))
    module_name = Column(String, nullable=False)
    module_description = Column(String, nullable=False)
    module_start_date = Column(DateTime, nullable=False)
    module_end_date = Column(DateTime, nullable=False)
    created_at = Column(DateTime, server_default=text("now()"))

    course = relationship("Course", back_populates="course_modules")
    coding_test_questions = relationship("CodingTestQuestions", back_populates="course_module")
    mcq_test_questions = relationship("MCQTestQuestions", back_populates="course_module")


class CodingTestQuestions(Base):
    __tablename__ = 'coding_test_questions'
    id = Column(UUID, server_default=text("uuid_generate_v4()"), primary_key=True, index=True)
    course_module_id = Column(UUID, ForeignKey('course_modules.id'))
    created_at = Column(DateTime, server_default=text("now()"))

    course_module = relationship("CourseModule", back_populates="coding_test_questions")
    coding_test_question_test_cases = relationship("CodingTestQuestionTestCases", back_populates="coding_test_question")


class CodingTestQuestionTestCases(Base):
    __tablename__ = 'coding_test_question_test_cases'
    id = Column(UUID, server_default=text("uuid_generate_v4()"), primary_key=True, index=True)
    coding_test_question_id = Column(UUID, ForeignKey('coding_test_questions.id'))
    is_sample_test_case = Column(Boolean, nullable=False)
    test_case_input = Column(String, nullable=False)
    test_case_output = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=text("now()"))

    coding_test_question = relationship("CodingTestQuestions", back_populates="coding_test_question_test_cases")


class MCQTestQuestions(Base):
    __tablename__ = 'mcq_test_questions'
    id = Column(UUID, server_default=text("uuid_generate_v4()"), primary_key=True, index=True)
    course_module_id = Column(UUID, ForeignKey('course_modules.id'))
    mcq_question = Column(String, nullable=False)
    mcq_options = Column(ARRAY(String), nullable=False)
    mcq_answer = Column(Integer, nullable=False)
    created_at = Column(DateTime, server_default=text("now()"))

    course_module = relationship("CourseModule", back_populates="mcq_test_questions")

class StudentCodingTestResults(Base):
    __tablename__ = 'student_coding_test_results'
    id = Column(UUID, server_default=text("uuid_generate_v4()"), primary_key=True, index=True)
    student_id = Column(UUID, ForeignKey('students.id'))
    coding_test_question_id = Column(UUID, ForeignKey('coding_test_questions.id'))
    student_code = Column(String, nullable=False)
    student_code_output = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=text("now()"))

    student = relationship("Student", back_populates="student_coding_test_results")
    coding_test_question = relationship("CodingTestQuestions", back_populates="student_coding_test_results")

class StudentMCQTestResults(Base):
    __tablename__ = 'student_mcq_test_results'
    id = Column(UUID, server_default=text("uuid_generate_v4()"), primary_key=True, index=True)
    student_id = Column(UUID, ForeignKey('students.id'))
    mcq_test_question_id = Column(UUID, ForeignKey('mcq_test_questions.id'))
    student_answer = Column(Integer, nullable=False)
    created_at = Column(DateTime, server_default=text("now()"))

    student = relationship("Student", back_populates="student_mcq_test_results")
    mcq_test_question = relationship("MCQTestQuestions", back_populates="student_mcq_test_results")

class StudentCourseModuleProgress(Base):
    __tablename__ = 'student_course_module_progress'
    id = Column(UUID, server_default=text("uuid_generate_v4()"), primary_key=True, index=True)
    student_id = Column(UUID, ForeignKey('students.id'))
    course_module_id = Column(UUID, ForeignKey('course_modules.id'))
    is_completed = Column(Boolean, nullable=False)
    created_at = Column(DateTime, server_default=text("now()"))

    student = relationship("Student", back_populates="student_course_module_progress")
    course_module = relationship("CourseModule", back_populates="student_course_module_progress")
