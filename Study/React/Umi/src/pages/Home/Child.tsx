import React from 'react';
import { IRouteComponentProps, connect } from 'umi';
interface ModelProps extends IRouteComponentProps {
  state: {
    HomeModel: {
      num: number;
    };
  };
  dispatch(action: { type: string; [params: string]: string | number }): void;
}

function Child(props: ModelProps) {
  const { state, dispatch } = props;
  return (
    <div>
      <span style={{ marginLeft: '20px' }}>{state.HomeModel.num}</span>
      <button
        onClick={() => {
          dispatch({
            type: 'HomeModel/changeNum',
            payload: 1,
          });
        }}
      >
        +1
      </button>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return { state };
};

export default connect(mapStateToProps)(Child);
