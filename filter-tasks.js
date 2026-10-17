export function filterTasks(tasks, filter) {
  switch (filter) {
    case 'ALL':
      return tasks;
    case 'ACTIVE':
      return tasks.filter((task) => !task.done);
    case 'DONE':
      return tasks.filter((task) => task.done);
    default:
      throw new RangeError(`Unsupported task filter: ${filter}`);
  }
}
