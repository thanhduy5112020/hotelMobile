import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useFetch from "../../hooks/useFetch";



const Chart = ({ aspect, title }) => {
  const { data, loading, error } = useFetch(`/hotels/sumByType`);
  // console.log(data[3]?.revenue2[0]?.sum )
  const data1 = [
    { name: "June", Total: 0},
    { name: "1 Star", Total: data[0]?.revenue1[0]?.sum},
    { name: "2 Star", Total: data[1]?.revenue2[0]?.sum },
    { name: "3 Star", Total: data[2]?.revenue3[0]?.sum },
    { name: "4 Star", Total: data[3]?.revenue4[0]?.sum },
    { name: "5 Star", Total: data[4]?.revenue5[0]?.sum},
  
    { name: "", Total: 0 },
  ];

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data1}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
