INSERT INTO departments (name)
VALUES
  ('Regular'),
  ('Leads'),
  ('Management');
INSERT INTO roles (name, salary, department)
VALUES
  ('Intern', 40000, 1),
  ('Engineer', 75000, 1),
  ('Lead', 100000, 2),
  ('Manager', 125000, 3);
INSERT INTO employees (first_name, last_name, role, manager)
VALUES
  ('Ronald', 'Firbank', NULL, NULL),
  ('Virginia', 'Woolf', 1, 10),
  ('Piers', 'Gaveston', 1, 0),
  ('Charles', 'LeRoi', 2, 10),
  ('Katherine', 'Mansfield', 2, 10),
  ('Dora', 'Carrington', 3, 0),
  ('Edward', 'Bellamy', 3, 0),
  ('Montague', 'Summers', 3, 10),
  ('Octavia', 'Butler', 3, 10),
  ('Unica', 'Zurn', 4, 10);
