import manImg from "../../assets/Foto.png";

export default function DescriptionForm() {
  return (
    <div className="descriptionContainer" style={{ backgroundColor: 'white', padding: '8px', borderRadius: '20px', width: '460px', height: '400px' }}>
      <ul className="descriptionMark">
        <li>
          <p style={{ fontSize: '15px', color: '#959595' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In suscipit suscipit porttitor.
            Suspendisse ex lorem, rhoncus nec ante eu, venenatis aliquam turpis. Nulla facilisi.
            Curabitur nec mattis dolor. Nulla finibus bibendum ligula tempus vehicula. Ut at
            tristique libero, nec efficitur dui. Aliquam erat volutpat. Fusce quam sem, tempus
            nec justo eget, luctus scelerisque velit. Nam sollicitudin purus urna, vitae ornare
            neque tincidunt vel. Proin ac lacinia erat, et commodo felis. Phasellus tempor tellus
            eu vulputate tempus.</p>
        </li>

        <img src={manImg} />
      </ul>
    </div>
  )
}
