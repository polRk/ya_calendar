// tslint:disable:no-console
import * as React from 'react';
import ConferenceItem, { IConference } from './ConferenceItem';

class Conferences extends React.Component<{ data: IConference[] }, { filter: (item: IConference) => boolean }> {
  public state = {
    filter: (item: IConference) => true
  };

  public onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    this.setState({
      filter: item => Object
        .values(item)
        .join('')
        .replace(/ /g, '')
        .toUpperCase()
        .includes(event.target.value.toUpperCase().replace(/ /g, ''))
    });
  };

  public render () {
    return <>
      <input type="search" className={'search'} onChange={this.onSearch} placeholder={'Search'}/>
      {
        this.props.data
          .filter(this.state.filter)
          .map((conference, index) =>
            <ConferenceItem data={conference} key={conference.name + index}/>)
      }
    </>;
  }
}

export default Conferences;
