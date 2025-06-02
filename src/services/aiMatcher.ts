export const matchSkills = (userSkills: string[], jobRequirements: string[]): string[] => {
    const matchedJobs: string[] = [];

    jobRequirements.forEach(job => {
        const jobSkills = job.split(','); // Assuming job requirements are comma-separated
        const isMatch = userSkills.every(skill => jobSkills.includes(skill));

        if (isMatch) {
            matchedJobs.push(job);
        }
    });

    return matchedJobs;
};