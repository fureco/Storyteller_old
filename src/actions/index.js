const OPEN_PROJECT = 'OPEN_PROJECT';

export const openProjectAction = (filePath) => {
    return {
        type: OPEN_PROJECT,
        filePath,
    };
}