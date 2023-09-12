import Cleaner from '../models/Cleaner.js';
import Hotel from '../models/Hotel.js';

export const getAllCleaners = async (req, res) => {
  try {
    const cleaners = await Cleaner.find();

    if (cleaners.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy thông tin người dọn phòng.' });
    }

    return res.status(200).json(cleaners);
  } catch (error) {
    return res.status(500).json({ message: 'Có lỗi xảy ra khi truy vấn thông tin người dọn phòng.' });
  }
};

export const createCleaner = async (req, res) => {
  try {
    const { name } = req.body;

    const cleaner = new Cleaner({
      name,
    });

    const newCleaner = await cleaner.save();

    return res.status(201).json(newCleaner);
  } catch (error) {
    return res.status(500).json({ message: 'Có lỗi xảy ra khi tạo người dọn phòng.' });
  }
};

export const updateCleanerTotalWork = async (req, res) => {
  const { id } = req.params; // Lấy id của người dọn phòng từ request params
  const { totalwork } = req.body; // Lấy giá trị totalwork mới từ request body

  try {
    const cleaner = await Cleaner.findById(id);

    if (!cleaner) {
      return res.status(404).json({ message: 'Người dọn phòng không tồn tại' });
    }

    cleaner.totalwork = totalwork;

    await cleaner.save();

    return res.status(200).json({ message: 'Cập nhật thành công', cleaner });
  } catch (error) {
    return res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật dữ liệu', error });
  }
};


export const deleteCleaner = async (req, res) => {
  try {
    const { id } = req.params;

    const cleaner = await Cleaner.findByIdAndRemove(id);

    if (!cleaner) {
      return res.status(404).json({ error: 'Cleaner not found' });
    }

    return res.status(200).json({ message: 'Cleaner deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const findCleanerWithLowestTotalWork = async (req, res) => {
  try {
    const cleaner = await Cleaner.findOne().sort({ totalwork: 1 });
    return res.status(200).json(cleaner);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};



export const getCleanerByHotelName = async (req, res) => {
  try {
    const hotelName = req.query.hotelName;
    const hotel = await Hotel.findOne({ name: hotelName });
    let cleaner;
    if (hotel) {
      cleaner = await Cleaner.findOne({ workplace: hotelName });
    }
    if (!cleaner) {
      cleaner = await Cleaner.findOne();
    }
    res.status(200).json(cleaner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};



