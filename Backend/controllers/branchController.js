class BranchController {
    constructor(Branch) {
        this.Branch = Branch;
    }

    async createBranch(req, res) {
        try {
            const branch = new this.Branch(req.body);
            await branch.save();
            res.status(201).json(branch);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllBranches(req, res) {
        try {
            const branches = await this.Branch.find();
            res.status(200).json(branches);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getBranchById(req, res) {
        try {
            const branch = await this.Branch.findById(req.params.id);
            if (!branch) {
                return res.status(404).json({ message: 'Branch not found' });
            }
            res.status(200).json(branch);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateBranch(req, res) {
        try {
            const branch = await this.Branch.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!branch) {
                return res.status(404).json({ message: 'Branch not found' });
            }
            res.status(200).json(branch);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteBranch(req, res) {
        try {
            const branch = await this.Branch.findByIdAndDelete(req.params.id);
            if (!branch) {
                return res.status(404).json({ message: 'Branch not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = BranchController;
