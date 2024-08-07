export function convertToMarkdown(todos: any , projectTitle : string) {
    let completedCount = todos.filter((todo: any) => todo.isCompleted).length;
    let totalCount = todos.length;
    
    let mdContent = `# **Todo List-${projectTitle}**\n\n`;
    mdContent += `**Summary:** ${completedCount}/${totalCount} completed\n\n`;
    
    mdContent += `## **Pending Todos**\n\n`;
    todos.filter((todo: any) => !todo.isCompleted).forEach((todo: any) => {
      mdContent += `- [ ] ${todo.description}\n`;
    });
    
    mdContent += `\n## **Completed Todos**\n\n`;
    todos.filter((todo: any) => todo.isCompleted).forEach((todo: any) => {
      mdContent += `- [x] ${todo.description}\n`;
    });
    
    return mdContent;
  }
  