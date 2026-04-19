function Logo({ h = 12, type = 1 }) {
  return <img src={`/images/logo-${type}.png`} alt='TrueMind Logo' className={`h-${h} w-auto`} />;
}

export default Logo;
