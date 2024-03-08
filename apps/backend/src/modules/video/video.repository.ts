import { db } from '../../utils/db';

class VideoRepository {
    private readonly db: typeof db;

    constructor() {
        this.db = db;
    }
}

const videoRepository = new VideoRepository();

export default videoRepository;
