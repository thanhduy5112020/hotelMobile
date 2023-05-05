import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"


export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (err) {
        next(err);
    }
}

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedHotel)
    } catch (err) {
        next(err);
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(
            req.params.id,
        )
        res.status(200).json("Hotel has been delete!!")
    } catch (err) {
        next(err);
    }
}

export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(
            req.params.id,
        )
        res.status(200).json(hotel)
    } catch (err) {
        next(err);
    }
}

export const getHotels = async (req, res, next) => {
    const { min, max, ...others } = req.query;
    try {
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: { $gt: min || 1, $lt: max || 999 },
        }).limit(req.query.limit);
        res.status(200).json(hotels)
    } catch (err) {
        next(err);
    }
}

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city })
        }))
        res.status(200).json(list)
    } catch (err) {
        next(err);
    }
}

export const countByType = async (req, res, next) => {
    try {
        const hotelCount1 = await Hotel.countDocuments({ type: "One Star" })
        const hotelCount2 = await Hotel.countDocuments({ type: "Two Star" })
        const hotelCount3 = await Hotel.countDocuments({ type: "Three Star" })
        const hotelCount4 = await Hotel.countDocuments({ type: "Four Star" })
        const hotelCount5 = await Hotel.countDocuments({ type: "Five Star" })
        res.status(200).json([
            { type: "One Star", count: hotelCount1 },
            { type: "Two Star", count: hotelCount2 },
            { type: "Three Star", count: hotelCount3 },
            { type: "Four Star", count: hotelCount4 },
            { type: "Five Star", count: hotelCount5 },
        ])
    } catch (err) {
        next(err);
    }
}

export const sumByType = async (req, res, next) => {
    try {
        const hotelCount1 = await Hotel.aggregate(
            [
                { $match: { type: "One Star" } },
                {
                    $group:
                    {
                        _id: null,
                        sum: { $sum: "$total" },
                    }
                }
            ]
        )
        const hotelCount2 = await Hotel.aggregate(
            [
                { $match: { type: "Two Star" } },
                {
                    $group:
                    {
                        _id: null,
                        sum: { $sum: "$total" },
                    }
                }
            ]
        )
        const hotelCount3 = await Hotel.aggregate(
            [
                { $match: { type: "Three Star" } },
                {
                    $group:
                    {
                        _id: null,
                        sum: { $sum: "$total" },
                    }
                }
            ]
        )
        const hotelCount4 = await Hotel.aggregate(
            [
                { $match: { type: "Four Star" } },
                {
                    $group:
                    {
                        _id: null,
                        sum: { $sum: "$total" },
                    }
                }
            ]
        )
        const hotelCount5 = await Hotel.aggregate(
            [
                { $match: { type: "Five Star" } },
                {
                    $group:
                    {
                        _id: null,
                        sum: { $sum: "$total" },
                    }
                }
            ]
        )
        res.status(200).json([
            { revenue1: hotelCount1 },
            { revenue2: hotelCount2 },
            { revenue3: hotelCount3 },
            { revenue4: hotelCount4 },
            { revenue5: hotelCount5 },
        ])

    } catch (err) {
        next(err);
    }
}

export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        console.log(hotel.rooms)
        const list = await Promise.all(hotel.rooms.map(room => {
            console.log(room)
            return Room.findById(room);
        }))
        console.log(list)
        res.status(200).json(list)
    } catch (err) {
        next(err);
    }
}

export const countByHotel = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments()
        res.status(200).json(hotelCount)
    } catch (err) {
        next(err);
    }
}

export const sumRevenueByHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.aggregate(
            [
                {
                    $group:
                    {
                        _id: null,
                        sum: { $sum: "$total" },
                    }
                }
            ]
        )
        res.status(200).json([
            { revenueAll: hotel }
        ])
    } catch (err) {
        next(err);
    }
}


export const searchHotelByLocation = async (req, res) => {
    const { city, minPrice, maxPrice } = req.query;
    const query = { city: { $regex: city, $options: 'i' } };

    // Thêm điều kiện tìm kiếm theo minPrice và maxPrice nếu được cung cấp
    if (minPrice && maxPrice) {
        query.cheapestPrice = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice) {
        query.cheapestPrice = { $gte: minPrice };
    } else if (maxPrice) {
        query.cheapestPrice = { $lte: maxPrice };
    }

    try {
        const hotels = await Hotel.find(query);

        if (hotels.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy khách sạn nào.' });
        }

        return res.status(200).json(hotels);
    } catch (error) {
        return res.status(500).json({ message: 'Có lỗi xảy ra khi tìm kiếm khách sạn.' });
    }
};




export const searchHotelsByPriceRange = async (req, res) => {
    const { minPrice, maxPrice } = req.query;

    try {
        const hotels = await Hotel.find({
            cheapestPrice: { $gte: minPrice, $lte: maxPrice },
        }).exec();

        // Kiểm tra nếu không tìm thấy khách sạn
        if (hotels.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy khách sạn.' });
        }

        // Trả về kết quả
        return res.status(200).json(hotels);
    } catch (error) {
        return res.status(500).json({ message: 'Có lỗi xảy ra khi tìm kiếm khách sạn.' });
    }
};

export const getTopRatedHotels = async (req, res) => {
    try {
        const hotels = await Hotel.aggregate([
            {
                $match: { rating: { $exists: true } },
            },
            {
                $addFields: {
                    ratingNumeric: {
                        $convert: {
                            input: "$rating",
                            to: "double",
                            onError: { $cond: { if: { $eq: ["$rating", ""] }, then: 0, else: "$rating" } },
                            onNull: 0,
                        },
                    },
                },
            },
            {
                $sort: { ratingNumeric: -1 },
            },
            {
                $limit: 3,
            },
        ]);

        if (hotels.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy khách sạn nào có điểm rating.' });
        }

        return res.status(200).json(hotels);
    } catch (error) {
        return res.status(500).json({ message: 'Có lỗi xảy ra khi truy vấn khách sạn.' });
    }
};

export const calculateTotal = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        let total = 0;

        hotels.forEach((hotel) => {
            total += hotel.total;
        });

        return res.status(200).json({ total });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const calculateAverageRating = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        let totalRating = 0;
        let count = 0;

        hotels.forEach((hotel) => {
            totalRating += hotel.rating;
            count++;
        });

        const averageRating = totalRating / count;
        const roundedRating = Math.round(averageRating * 10) / 10; // Làm tròn đến chữ số thập phân thứ nhất

        return res.status(200).json({ averageRating: roundedRating });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const findHotelWithMaxRevenue = async (req, res) => {
    try {

        const hotels = await Hotel.find().sort({ total: -1 }).limit(1);

        if (hotels.length === 0) {
            return res.status(404).json({ message: 'No hotels found' });
        }

        const hotel = hotels[0];
        const { name, total } = hotel;

        return res.status(200).json({ name, total });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const findTopHotelsByTotal = async (req, res) => {
    try {
      const hotels = await Hotel.find();
      const totalSum = hotels.reduce((sum, hotel) => sum + hotel.total, 0);
      const sortedHotels = hotels.sort((a, b) => b.total - a.total).slice(0, 4);
  
      const result = sortedHotels.map((hotel) => ({
        name: hotel.name,
        amount: hotel.total,
      }));
  
      const remainingTotal = totalSum - result.reduce((sum, hotel) => sum + hotel.amount, 0);
      result.push({ name: 'Remaining', amount: remainingTotal });
  
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  export const calculateTotalByType = async (req, res) => {
    try {
      const result = await Hotel.aggregate([
        {
          $group: {
            _id: '$type',
            total: { $sum: '$total' },
          },
        },
      ]);
  
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  
  













