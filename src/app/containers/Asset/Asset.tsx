/**
 * Copyright 2018 Ambrosus Inc.
 * Email: tech@ambrosus.com
 */
import React, { Component, lazy, Suspense } from 'react';
import './Asset.scss';
import { getStyles, scrollTop } from '../../utils';
import { withRouter, RouteComponentProps } from 'react-router';
import { inject, observer } from 'mobx-react';
import { AssetStore } from '../../store/asset.store';
import {
  AdditionalImages,
  AssetIdentifiers,
  AssetDetails,
  Timeline,
} from './components';
import Loader from '../../components/Loader';
const AssetImage: any = lazy(() => import('./components/AssetImage'));
interface AssetProps extends RouteComponentProps<{ assetId: string }> {
  AssetStore: AssetStore;
}

interface AssetStates {
  selectedImage: string | null;
}

@inject('AssetStore')
@observer
class Asset extends Component<AssetProps, AssetStates> {
  constructor(props: AssetProps) {
    super(props);
    this.state = {
      selectedImage: null,
    };
  }

  public componentDidMount() {
    scrollTop();
  }

  public onImageSelect = (selectedImage: string) => {
    this.setState({ selectedImage });
  };

  public getDefaultImage = () => {
    try {
      const { asset } = this.props.AssetStore;
      return asset.info.images.default.url;
    } catch (error) {
      return '';
    }
  };

  public render() {
    const { asset, events } = this.props.AssetStore;
    const { selectedImage } = this.state;
    const { assetId } = this.props.match.params;
    if (asset && asset.info) {
      return (
        <div className='Info'>
          <div className='item' style={getStyles('content')}>
            <div className='wrapper'>
              <div className='item__container'>
                <Suspense fallback={<Loader />}>
                  <AssetImage
                    url={selectedImage ? selectedImage : this.getDefaultImage()}
                    name={asset.info.name}
                  />
                </Suspense>
                <AdditionalImages
                  images={asset.info.images}
                  onSelect={this.onImageSelect}
                />
                <AssetIdentifiers info={asset.info} />
                <AssetDetails asset={asset} />
              </div>
              {events && (
                <div className='item__container'>
                  <Timeline events={events} assetId={assetId} />
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
    if (asset && !asset.info) {
      return (
        <div>
          <div className='noContent'>
            <p>
              This asset has no data. <br /> Please try another one.
            </p>
          </div>
        </div>
      );
    }
    return <div />;
  }
}

export default withRouter(Asset);
