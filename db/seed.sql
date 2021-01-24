INSERT INTO department (department_id)
VALUES
   ('java'),
   ('html/css'),
   ('test'),
   ('hr'),
   ('managment');

  INSERT INTO rolls (job_title, salary, department_id)
  VALUES
    ('javaGuru', 95000, 1),
    ('front end ', 75000, 2),
    ('tester', 65000, 3),
    ('payroll', 50000, 4),
    ('hefe', 125000, 5);

INSERT INTO employee (first_name, last_name, title_id, department_id, salary_id, manager_id)
VALUES
    ('jo', 'vargo', 1, 1, 1, 5 ),
    ('mark', 'harbor', 2, 2, 2, 5 ),
    ('kimiko', 'tanaka', 3, 3, 3, 1 );