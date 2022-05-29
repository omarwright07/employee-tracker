INSERT INTO departments (name)
VALUES
  ('Regular'),
  ('Leads'),
  ('Management');
INSERT INTO roles (name, salary, department_id)
VALUES
  ('Intern', 40000, 1),
  ('Engineer', 75000, 1),
  ('Lead', 100000, 2),
  ('Manager', 125000, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', NULL, 1),
  ('Virginia', 'Woolf', 1, 1),
  ('Piers', 'Gaveston', 1, 0),
  ('Charles', 'LeRoi', 2, 1),
  ('Katherine', 'Mansfield', 2, 1),
  ('Dora', 'Carrington', 3, 0),
  ('Edward', 'Bellamy', 3, 0),
  ('Montague', 'Summers', 3, 1),
  ('Octavia', 'Butler', 3, 1),
  ('Unica', 'Zurn', 4, 1);
