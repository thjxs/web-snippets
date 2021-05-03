import { Component } from 'react';

interface LazyloadProps {
  scrollContainer: string | object;
}
class Lazyload extends Component<LazyloadProps> {
  visible: boolean;
  ref?: Element;
  constructor(props: LazyloadProps) {
    super(props);
    this.visible = false;
    this.setRef = this.setRef.bind(this);
  }

  componentDidMount() {
    const { scrollContainer } = this.props;
    if (scrollContainer) {
    }
  }

  shouldComponentUpdate() {
    return this.visible;
  }

  setRef(element: Element) {
    if (element) {
      this.ref = element;
    }
  }
}
