import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch, useParams, useHistory, Route } from 'react-router-dom';

import { ROUTES } from '../../constants';

import StepWizardHeader from './StepWizardHeader';
import withRouteSlug from '../../hocs/withRouteSlug';

import styles from './styles.module.scss';
import StepWizardNotification from './StepWizardNotification';

const StepWizard = ({
  steps,
  onForward,
  onBack,
  onFinish,
  isEditing,
  data,
  hasUnsavedData,
  onLoadData,
  onClearData,
}) => {
  const [firstStep] = steps;
  const { slug: defaultSlug } = firstStep;

  const [lastStep, setLastStep] = useState(defaultSlug);

  const { path } = useRouteMatch();
  const { slug, id } = useParams();
  const history = useHistory();

  const isSlugExists = steps.some((step) => step.slug === slug);
  const activeStep = steps.findIndex((step) => step.slug === slug);

  const lastStepIndex = steps.findIndex((step) => step.slug === lastStep);

  const stepWizardTabs = steps.map((item, index) => ({
    title: `${index + 1}. ${item.title}`,
    isActive: activeStep === index,
    isDisabled: !isEditing && index > lastStepIndex,
    path: isEditing
      ? path.replace(':slug', item.slug).replace(':id', id)
      : path.replace(':slug', item.slug),
    key: item.slug,
  }));

  const onBackClick = useCallback(() => {
    onBack();
    const nextSlug = steps[activeStep - 1].slug;
    history.push(path.replace(':slug', nextSlug));
  }, [activeStep, history, onBack, path, steps]);

  const onFinishClick = useCallback(
    (values) => {
      onFinish(values);
    },
    [onFinish],
  );

  const onForwardClick = useCallback(
    (values) => {
      const nextSlug = steps[activeStep + 1].slug;
      onForward({ ...values, lastStep: nextSlug })
        .then(() => history.push(path.replace(':slug', nextSlug)))
        .catch(() => {});
    },
    [onForward, steps, activeStep, history, path],
  );

  const onLoadDataClick = useCallback(() => {
    onLoadData();
    history.push(path.replace(':slug', lastStep));
  }, [history, lastStep, onLoadData, path]);

  useEffect(() => {
    if ((!isEditing && activeStep > lastStepIndex) || !isSlugExists) {
      history.replace(path.replace(':slug', defaultSlug));
    }
  }, [activeStep, defaultSlug, history, isEditing, isSlugExists, lastStepIndex, path, slug]);

  useEffect(() => {
    if (isEditing && !isSlugExists) {
      history.replace(path.replace(':slug', defaultSlug).replace(':id', id));
    }
  }, [defaultSlug, history, id, isEditing, isSlugExists, path]);

  useEffect(() => {
    if (path === ROUTES.newUser) {
      history.push(`${path}/${defaultSlug}`);
    }
  }, [defaultSlug, history, path]);

  useEffect(() => {
    const { lastStep: dataLastStep } = data;
    if (dataLastStep) {
      setLastStep(dataLastStep);
    }
  }, [data]);

  return (
    <div className={styles.wrapper}>
      <StepWizardHeader steps={stepWizardTabs} />
      {hasUnsavedData && (
        <StepWizardNotification onLoadData={onLoadDataClick} onClearData={onClearData} />
      )}
      <div className={styles.wizardWrapper}>
        {
          steps.map((item, index) => {
            const Component = item.component;
            const props = {
              isFirst: index === 0,
              isLast: index === steps.length - 1,
              key: item.slug,
              onBack: onBackClick,
              onNext: index === steps.length - 1 || isEditing ? onFinishClick : onForwardClick,
              isEditing,
              data,
            };
            return (
              <Route
                key={item.slug}
                path={path.replace(':slug', item.slug)}
                render={(routeProps) => <Component {...props} {...routeProps} />}
              />
            );
          })[activeStep]
        }
      </div>
    </div>
  );
};

StepWizard.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      component: PropTypes.any,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
  onForward: PropTypes.func,
  onBack: PropTypes.func,
  onFinish: PropTypes.func,
  isEditing: PropTypes.bool,
  data: PropTypes.any,
  hasUnsavedData: PropTypes.bool,
  onLoadData: PropTypes.func,
  onClearData: PropTypes.func,
};

StepWizard.defaultProps = {
  onForward: () => {},
  onBack: () => {},
  onFinish: () => {},
  isEditing: false,
  data: null,
  hasUnsavedData: false,
  onLoadData: () => {},
  onClearData: () => {},
};

export default withRouteSlug(StepWizard);
