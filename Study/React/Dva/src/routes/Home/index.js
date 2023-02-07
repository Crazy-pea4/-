import React, { useEffect } from "react";
import { connect } from "dva";

function Home(props) {
  console.log(props);
  // 与react-redux一致
  const { HomeModel } = props.state;
  // props里还会多一个dispatch
  const { dispatch } = props;
  useEffect(() => {
    dispatch({
      // 需要通过 / 的形式指定对应model和里面的方法
      type: "HomeModel/fetchList",
    });
  }, []);

  return (
    <div>
      <div>{HomeModel.num}</div>
      <button
        onClick={() => {
          dispatch({
            type: "HomeModel/changeNum",
            payload: 1,
          });
        }}
      >
        +1
      </button>
      <ul>
        {HomeModel.list.map((i) => (
          <li key={i.filmId}>
            <div>{i.name}</div>
            <img src={i.poster} alt={i.name} style={{ width: "200px" }}></img>
          </li>
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { state };
};
const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
