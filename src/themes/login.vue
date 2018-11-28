<div class="container">		
	<div class="columns is-centered mt-6">
		<div class="column is-one-third is-centered">
			<div class="card card-shadow">
				<div class="card-content">
					<h5 class="pb-3 mb-4 border-bottom">Login</h5>

					<form method="POST">
					 
						<div class="field">
							<label for="email" class="label">Email Address</label>

							<p class="control has-icons-left">
								<input class="input" type="email" id="email" placeholder="Email">

								<span class="icon is-small is-left">
									<i data-feather="mail"></i>
								</span>
							</p>
						</div>

						<div class="field mt-5">
							<label class="label" for="password">
								Password

								<a href="forgot.html" class="is-pulled-right">
									Forgot Password?
								</a>
							</label>

							<p class="control has-icons-left">
								<input id="password" type="password" class="input" name="password">

								<span class="icon is-small is-left">
									<i data-feather="lock"></i>
								</span>
							</p>
						</div>

						<div class="field mt-5">
							<button type="submit" class="button is-primary is-fullwidth">
								Login
							</button>
						</div>

						<div class="has-text-centered">
							Don't have an account? <a href="register.html">Create One</a>
						</div>
					</form>
				</div>
			</div>
			<!-- END card -->

			<div class="footer has-text-centered p-4">
				Copyright &copy; <?php echo date('Y'); ?>
			</div>
			<!-- END footer -->
		</div>
		<!-- END column -->
	</div>
	<!-- END columns -->
</div>
<!-- END container -->